import Link from "next/link";
import React from "react";

function page({ data }) {
  return (
    <section>
      <h1 className="text-4xl font-poppins text-center p-8">
        This is Events page
      </h1>
      <div>
        {data.map((ev) => {
          return (
            <div key={ev.id} className="m-10">
              <Link href={`/events/${ev.id}`}>
                <h2 className="text-2xl font-poppins font-bold">
                  {ev.title}
                </h2>
              </Link>
              <img
                className="w-[400px] h-[300px]"
                src={ev.image}
                alt="city-image"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default page;

export async function getStaticProps(ctx) {
  const { events_categories } = await import(
    "../../data/data.json"
  );
  return {
    props: {
      data: events_categories,
    },
  };
}
