import { list } from "postcss";

export default function page({ data }) {
  console.log(data);
  return (
    <section className="p-10 flex flex-col space-y-8">
      <h1 className="text-4xl font-poppins font-semibold">
        {data.title}, {data.city}
      </h1>
      <img
        className="w-[500px] h-[300px] object-fill
        rounded-[20px] shadow-xl"
        src={data.image}
        alt="event-image"
      />
      <p className="max-w-[470px] font-poppins font-medium">
        {data.description}
      </p>
      <div>
        <h4 className="font-bold font-poppins">
          Registered Emails:
        </h4>
        {data.emails_registered.length !== 0 ? (
          <ul>
            {data.emails_registered.map(
              (email) => (
                <li className="font-light font-poppins">
                  {email}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="font-poppins font-normal">
            None
          </p>
        )}
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  const { allEvents } = await import(
    "../../../data/data.json"
  );
  const allPaths = allEvents.map((ev) => {
    return {
      params: {
        id: ev.id,
        categories: ev.city,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  const id = ctx?.params.id;
  const { allEvents } = await import(
    "../../../data/data.json"
  );
  const data = allEvents.filter(
    (ev) => ev.id === id
  );

  return {
    props: {
      data: data[0],
    },
  };
}
