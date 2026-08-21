import {
  LuGlobe, LuMapPin, LuPlane, LuHotel, LuStamp, LuHeart, LuUsers, LuBriefcase,
  LuUsersRound, LuMoon, LuShieldCheck, LuCar, LuAward, LuHandshake, LuLightbulb,
  LuHeartHandshake, LuCircleHelp,
} from "react-icons/lu";

const ICONS = {
  Globe: LuGlobe,
  MapPin: LuMapPin,
  Plane: LuPlane,
  Hotel: LuHotel,
  Stamp: LuStamp,
  Heart: LuHeart,
  Users: LuUsers,
  Briefcase: LuBriefcase,
  UsersRound: LuUsersRound,
  Moon: LuMoon,
  ShieldCheck: LuShieldCheck,
  Car: LuCar,
  Award: LuAward,
  Handshake: LuHandshake,
  Lightbulb: LuLightbulb,
  HeartHandshake: LuHeartHandshake,
};

export function getIcon(name) {
  return ICONS[name] || LuCircleHelp;
}
