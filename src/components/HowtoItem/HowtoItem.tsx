import Image from "next/image";

interface HowtoItemProps {
  icon: string;
  title: string;
  content: string;
}

const HowtoItem = ({ item }: { item: HowtoItemProps }) => {
  return (
    <div className="w-80 px-6 py-4 flex flex-col gap-5 rounded-md bg-[#353731]">
      <Image src={item.icon} alt="icon" width={60} height={60} />
      <p className="font-bold">{item.title}</p>
      <p className="text-sm">{item.content}</p>
    </div>
  );
};

export default HowtoItem;