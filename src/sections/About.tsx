import dynamic from "next/dynamic";
import Link from "next/link";

const TrackImg = dynamic(() => import("@/components/trackImg"), {
  ssr: false,
});

const About = () => {
  return (
    <div
      id="about"
      className="flex flex-col gap-2 relative text-center lg:text-left"
    >
      <div className="font-revoluti text-base text-[#dbdbcf] my-5">
        <span className="relative">
          ABOUT IRONWILL
          <TrackImg className="absolute top-0 translate-x-24 -translate-y-24 w-[240px] h-[240px] -z-10" />
        </span>
      </div>
      <p className="stretched-font-stretch font-helvetica font-light text-base text-[#dbdbcf] scale-x-95 scale-y-110 lg:-ml-4">
        {`IRONWILL envisions a world where martial arts transcend
              barriers, empowers individuals and unites communities. To achieve
              this, we're building a decentralized platform, powered by our
              native coin FICCO, that unlocks unprecedented opportunities for
              all stakeholders in combat sports—from aspiring amateurs and
              passionate fans to seasoned professionals and dedicated clubs.
              Through IRONWILL, fighters can take control of their careers and
              engage directly with fans, while fans can support their favorite
              athletes and invest in their success, fostering a more equitable
              and rewarding future for the world of combat sports.`}
      </p>
      <Link
        href={"/assets/documents/whitepaper.pdf"}
        className="font-helvetica font-light text-base text-[#824b3d] hover:text-[#dbdbcf]"
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        Read more, download whitepaper
      </Link>
    </div>
  );
};

export default About;
