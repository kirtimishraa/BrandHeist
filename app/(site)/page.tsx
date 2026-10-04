import Hero from "@/components/sections/Hero";
import Flex from "@/components/sections/Flex";
import Arsenal from "@/components/sections/Arsenal";
import Menu from "@/components/sections/Menu";
import GetFreeAudit from "@/components/sections/GetFreeAudit";
// import Crew from "@/components/sections/Crew"; // Crew section hidden for now
import Talk from "@/components/sections/Talk";

export default function Home() {
  return (
    <>
      <Hero />
      <Flex />
      <Arsenal />
      <Menu />
      <GetFreeAudit />
      {/* <Crew /> */}
      <Talk />
    </>
  );
}
