import { useRouter } from "next/router.js";
import axios from "../../../helpers/axios/axios.js";
import { useState } from "react";

export default function page({ data }) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    const eventID = router?.query.id;
    event.preventDefault();
    try {
      axios.post("/register-email", {
        email: email,
        eventID: eventID,
      });
    } catch (error) {
      console.log("An error Occured");
    }
  };

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
              (email, index) => (
                <li
                  key={index}
                  className="font-light font-poppins"
                >
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
      <form onSubmit={handleSubmit}>
        <h4 className="font-semibold text-2xl">
          Register
        </h4>
        <div className="flex flex-col">
          <label
            className="font-poppins"
            htmlFor=""
          >
            Enter Your Email:
          </label>
          <input
            required
            className="border-black border-2 w-1/3 rounded-md px-2 py-1"
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            className="py-2 px-4 mt-4 bg-indigo-600 text-white w-1/5 font-poppins
          rounded-md shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
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
