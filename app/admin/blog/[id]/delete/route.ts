import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const supabase = await createClient();

    // ==========================================
    // CHECK USER
    // ==========================================

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ==========================================
    // GET POST ID
    // ==========================================

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Post ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // GET POST
    // ==========================================

    const {
      data: post,
      error: postError,
    } = await supabase
      .from("blog_posts")
      .select(
        `
          id,
          featured_image,
          author_id
        `
      )
      .eq("id", id)
      .single();

    if (postError) {
      return NextResponse.json(
        {
          error: postError.message,
        },
        {
          status: 404,
        }
      );
    }

    if (!post) {
      return NextResponse.json(
        {
          error: "Post not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================
    // CHECK OWNERSHIP
    // ==========================================

    if (post.author_id !== user.id) {
      return NextResponse.json(
        {
          error:
            "You are not allowed to delete this post.",
        },
        {
          status: 403,
        }
      );
    }

    // ==========================================
    // DELETE FEATURED IMAGE
    // ==========================================

    if (post.featured_image) {
      try {
        const imageUrl =
          new URL(post.featured_image);

        const pathname =
          imageUrl.pathname;

        const marker =
          "/storage/v1/object/public/blog/";

        const markerIndex =
          pathname.indexOf(marker);

        if (markerIndex !== -1) {
          const filePath =
            pathname.substring(
              markerIndex + marker.length
            );

          if (filePath) {
            const {
              error: storageError,
            } = await supabase.storage
              .from("blog")
              .remove([filePath]);

            if (storageError) {
              console.error(
                "Storage delete error:",
                storageError
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "Failed to parse image URL:",
          error
        );
      }
    }

    // ==========================================
    // DELETE POST
    // ==========================================

    const {
      error: deleteError,
    } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id)
      .eq("author_id", user.id);

    if (deleteError) {
      return NextResponse.json(
        {
          error: deleteError.message,
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete post error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}