export default function page() {
  return <div>Enter</div>;
}

export async function getServerSideProps(ctx) {
  console.log(ctx);
  return {
    props: {
      data: null,
    },
  };
}
