import AddNewInterview from "@/components/AddNewInterview";
import InterviewCards from "@/components/InterviewCards";
import Head from "next/head";

const Dashboard = () => {

  return (
    <>
      <Head>
        <title>AI Interview Mockup | Prepare with Realistic Simulations</title>
        <meta
          name="description"
          content="Prepare for job interviews with our AI-based interview mockup platform. Practice answering questions and receive instant feedback to improve your performance."
        />
        <meta
          name="keywords"
          content="AI Interview, mock interview, interview preparation, job interview, AI-based interview platform, interview simulation, practice interview questions"
        />
        <meta name="Sami"  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph for social media */}
        <meta
          property="og:title"
          content="AI Interview Mockup | Prepare with Realistic Simulations"
        />
        <meta
          property="og:description"
          content="Ace your next job interview with AI-driven mock interviews. Get feedback, refine your answers, and track your progress."
        />
        <meta property="og:url" content="https://xyedsami135.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://your-website.com/preview-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI Interview Mockup | Practice Interviews"
        />
        <meta
          name="twitter:description"
          content="Prepare for interviews with AI-driven simulations and real-time feedback."
        />
        <meta
          name="twitter:image"
          content="https://your-website.com/preview-image.jpg"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="block mx-5 my-5 md:my-10  md:mx-20 lg:mx-30">
        <h2 className="font-bold  text-2xl md:text-3xl lg:text-4xl">
          Dashboard
        </h2>
        <h2 className="">Start your AI Mockup Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-3 my-5">
          <InterviewCards />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
