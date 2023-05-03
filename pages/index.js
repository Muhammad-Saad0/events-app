import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <section className="p-10" id="home">
      <h1 className="text-4xl text-center font-poppins">
        This is Home page
      </h1>
      {data.map((ev) => {
        return (
          <div className="font-poppins m-10" key={ev.id}>
            <a href={`events/${ev.id}`}>
              <h2 className="font-semibold text-3xl">{ev.title}</h2>
            </a>
            <img
              className="w-[400px] h-[200px] object-fill"
              src={ev.image}
              alt={ev.id}
            />
            <p className="max-w-[620px]">{ev.description}</p>
          </div>
        );
      })}
    </section>
  );
}

export const getServerSideProps = async (ctx) => {
  const { events_categories } = await import(
    "../data/data.json"
  );
  
  return {
    props: {
      data: events_categories,
    },
  };
};
