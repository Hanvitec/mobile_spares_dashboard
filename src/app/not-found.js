import Link from "next/link";

const ErrorPage = ({ statusCode }) => {
  return (
    <div className="flex flex-col w-[80%] items-center justify-center h-[full] my-2 mr-2 bg-white">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-4">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <Link href="/dashboard">
        <p className="text-blue-500 underline">Go back Dashboard</p>
      </Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
