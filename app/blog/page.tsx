import { Metadata } from "next";
import { Footer, LogoTicker } from "@/components";
import MiniGalleryScroller from "@/components/MiniGalleryScroller";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Kako pravilno prati veš i ukloniti fleke | Saveti - Beograd",
  description:
    "Profesionalni saveti za pranje veša, uklanjanje fleka i održavanje odeće u Beogradu.",
};

const tips = [
  {
    title: "Kako pravilno razdvojiti veš",
    text: "Beli, tamni i šareni veš uvek perite odvojeno da biste sačuvali boje.",
  },
  {
    title: "Fleke od kafe",
    text: "Isperi odmah hladnom vodom, ne trljaj agresivno. Koristi blagi deterdžent.",
  },
  {
    title: "Fleke od vina",
    text: "Pospi so ili sodu bikarbonu, pa operi u hladnoj vodi.",
  },
  {
    title: "Masne fleke",
    text: "Deterdžent za sudove direktno na fleku, ostavi 10 minuta pre pranja.",
  },
];

const faq = [
  {
    q: "Koja temperatura je najbolja za pranje veša?",
    a: "30–40°C za svakodnevni veš, 60°C za peškire i jače prljanje.",
  },
  {
    q: "Kako sprečiti oštećenje odeće?",
    a: "Ne koristiti previše visoku temperaturu i izbegavati agresivne hemikalije.",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white">

      {/* HERO COMPONENT */}
      <Navbar />
<br />      {/* HERO ARTICLE */}
      <article className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border">

          <h1 className="text-4xl font-bold leading-tight text-[#08647d]">
            Kako pravilno prati veš i ukloniti fleke
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Naučite profesionalne trikove za pranje odeće i održavanje tkanina.
            Saveti iz realne prakse perionice veša u Beogradu.
          </p>

          <div className="mt-6 text-sm text-gray-500">
            ✔ praktični saveti ✔ bez oštećenja odeće ✔ profesionalni rezultati
          </div>

          <button className="mt-6 text-[#08647d] font-medium hover:underline">
            Read full guide →
          </button>

        </div>

        <img
          src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c"
          alt="Laundry clean clothes"
          className="rounded-2xl shadow-lg object-cover w-full h-[320px]"
        />

      </article>

      {/* TIPS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-6">
          Saveti za pranje i uklanjanje fleka
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {tips.map((item, i) => (
            <article
              key={i}
              className="group border rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-[#08647d]">
                {item.title}
              </h3>

              <p className="text-gray-600 line-clamp-3">
                {item.text}
              </p>

              <button className="mt-4 text-sm font-medium text-[#08647d] flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more →
              </button>

            </article>
          ))}

        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          alt="Laundry machines"
          className="rounded-2xl w-full h-[400px] object-cover shadow-md"
        />
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-6">
          Često postavljena pitanja
        </h2>

        <div className="space-y-4">

          {faq.map((item, i) => (
            <details
              key={i}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-[#08647d]">
                {item.q}
              </summary>

              <p className="text-gray-600 mt-2">
                {item.a}
              </p>
            </details>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">

        <h2 className="text-xl font-bold">
          Profesionalna perionica veša u Beogradu
        </h2>

        <p className="text-gray-600 mt-2">
          Uštedite vreme i dobijte savršeno čist veš bez muke.
        </p>

      </section>

      <MiniGalleryScroller />
      <Footer />

    </main>
  );
}