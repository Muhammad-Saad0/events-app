import Link from "next/link";

export default function page({ data, city }) {
  return (
    <section className="p-10">
      <h1 className="font-poppins text-center font-bold text-4xl">
        Events in {city}
      </h1>
      {data.map((ev) => (
        <div
          key={ev.id}
          className="flex flex-col space-y-3 m-10"
        >
          <Link href={`/events/${city}/${ev.id}`}>
            <h1 className="font-poppins text-2xl">
              {ev.title}
            </h1>
          </Link>
          <p className="max-w-[470px] font-poppins text-slate-700">
            {ev.description}
          </p>
          <img
            className="rounded-[20px] h-[300px] w-[400px] object-fill"
            src={ev.image}
            alt="event-image"
          />
        </div>
      ))}
    </section>
  );
}

export async function getStaticPaths() {
  const { events_categories } = await import(
    "../../../data/data.json"
  );

  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        categories: ev.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  const id = ctx?.params.categories;
  const { allEvents } = await import(
    "../../../data/data.json"
  );
  const data = allEvents.filter(
    (ev) => ev.city === id
  );
  return {
    props: {
      data: data,
      city: id,
    },
  };
}
