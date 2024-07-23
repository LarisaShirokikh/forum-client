import Link from "next/link";
import Image from "next/image";
import Ad from "./Ad";
import { Activity, BookCheck, CalendarClock, ChefHat, Dices, Flame, Laugh, Newspaper, Sailboat, Trophy } from "lucide-react";
import ProfileCard from "./ProfileCard";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* {type === "home" && "Профиль" <ProfileCard /> } */}
      <div className="p-2  text-m text-gray-500 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Flame color="#FF1493" />
          <span>Популярное</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Newspaper color="#00FFFF" />
          <span>Новое</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <BookCheck />
          <span>Развитие и Обучение</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Activity />
          <span>Здоровье и Уход</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Dices />
          <span>Развлечения и Игры</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Laugh />
          <span>Психология и Эмоции</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/news.png" alt="" width={20} height={20} />
          <span>Творчество и Хобби</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Trophy />
          <span>Спорт и Активности</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <ChefHat />
          <span>Рецепты и Питание</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Sailboat />
          <span>Путешествия и Отдых</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Newspaper />
          <span>Новости и Статьи</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <CalendarClock />
          <span>События и Мероприятия</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftMenu;
