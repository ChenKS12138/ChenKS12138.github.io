import iconGithub from "@/images/github.png";
import iconTwitter from "@/images/twitter.png";

import ARCHIVES_HEADER_IMAGE from "@/images/OLJxbaR.jpg";
import DETAIL_HEADER_IMAGE from "@/images/FSwWKYB.jpg";
import ABOUT_HEADER_IMAGE from "@/images/rVtDsho.png";
import USER_AVATAR from "@/images/avatar.png";

const HOME_HEADER_IMAGE = "https://open.saintic.com/api/bingPic/";

interface Config {
  name: string;
  avatar?: string;
  intro?: Array<string>;
  github?: string;
  twitter?: string;
  links?: Array<{
    name: string;
    avatar?: string;
    link?: string;
  }>;
  associations?: Array<{
    icon: string;
    url: string;
  }>;
  headerImages?: {
    home?: string;
    archives?: string;
    detail?: string;
    about?: string;
  };
}

const config: Config = {
  name: "ChenKS",
  avatar: USER_AVATAR,
  intro: [
    "一个热爱技术的大学生，青柚工作室成员，南邮校科协成员。",
    "Enjoy JavaScript/TypeScript/Dart/Golang.",
    "Enjoy Coding.",
  ],
  github: "https://github.com/ChenKS12138",
  twitter: "https://twitter.com/ChenKS12138",
  links: [
    {
      name: "xichi",
      avatar: "https://avatars3.githubusercontent.com/u/48639990?s=460&v=4",
      link: "https://blog.xichi.xyz/",
    },
    {
      name: "yizero",
      avatar: "https://avatars3.githubusercontent.com/u/45324620?s=460&v=4",
      link: "https://yizero10.github.io/",
    },
    {
      name: "pikanglong",
      avatar: "https://avatars1.githubusercontent.com/u/26516046?s=400&v=4",
      link: "https://www.pikanglong.com/",
    },
    {
      name: "X3ZvaWQ",
      avatar: "https://avatars3.githubusercontent.com/u/47066861?s=460&v=4",
      link: "http://blog.x3zvawq.xyz",
    },
    {
      name: "0xfaner",
      avatar: "https://avatars2.githubusercontent.com/u/44130614?s=460&v=4",
      link: "https://0xfaner.top/",
    },
    {
      name: "yiayaz",
      avatar: "https://avatars0.githubusercontent.com/u/44493388?s=460&v=4",
      link: "https://yiayaz.github.io/",
    },
    {
      name: "Brethland",
      avatar:
        "https://avatars0.githubusercontent.com/u/44054691?s=400&u=9dcfe768ad2ce2b45a06e809dd283b36fd7a7b47&v=4",
      link: "http://www.yuki.systems/",
    },
    {
      name: "xjzsq",
      avatar: "https://avatars0.githubusercontent.com/u/13806783?s=460&v=4",
      link: "http://xjzsq.ren/",
    },
    {
      name: "baiyecha404",
      avatar:
        "https://avatars2.githubusercontent.com/u/43843620?s=460&u=abdb1e7400fc7415c5208530e2c4ebe4ab8a2bba&v=4",
      link: "https://bycsec.top",
    },
  ],
  associations: [
    {
      icon: iconGithub,
      url: "https://github.com/ChenKS12138",
    },
    {
      icon: iconTwitter,
      url: "https://twitter.com/ChenKS12138",
    },
  ],
  headerImages: {
    home: HOME_HEADER_IMAGE,
    about: ABOUT_HEADER_IMAGE,
    archives: ARCHIVES_HEADER_IMAGE,
    detail: DETAIL_HEADER_IMAGE,
  },
};

export default config;
