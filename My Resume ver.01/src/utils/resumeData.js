import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import WebIcon from '@material-ui/icons/Web';
import LanguageIcon from '@material-ui/icons/Language';

const resumeData = {
  name: 'Hà Văn Quang',
  gender: 'Male',
  title: 'quanghavan29@gmail.com',
  email: 'quanghavan29@gmail.com',
  phone: '0968904962',
  birthday: '29 June 2000',
  address: 'Xuân Giang - Sóc Sơn - Hà Nội',
  school: 'FPT University',
  job: 'Web Developer',
  avatarUrl:
    'https://res.cloudinary.com/fpt-food/image/upload/v1641068997/My%20Projects/NodeJS%20and%20ReactJS/profile_avatar_kdwi1n.jpg',
  myCV: 'https://www.topcv.vn/xem-cv/XQMCUgUBVFYGUQUDWgEABVAAU1YLU1YBVFdWVw0101',
  socials: {
    facebook: {
      link: 'https://www.facebook.com/quanghavan29',
      text: 'Quang Cối',
      icon: <FacebookIcon />,
    },
    twitter: {
      link: 'https://www.facebook.com/quanghavan29',
      text: 'MyTwitter',
      icon: <TwitterIcon />,
    },
    github: {
      link: 'https://github.com/quanghavan29',
      text: 'MyGithub',
      icon: <GitHubIcon />,
    },
  },
  aboutMe: {
    content1:
      'The “about us” page is a must-have page (this can be a page on your website, separate landing page or even “about me” website as a type of portfolio) used by all types of businesses to give customers more insight into who is involved with a given business and exactly what it does.',
    content2:
      'Your “About me” page forms the first impression of a company or product, puts a name and a face to your business, and gives website visitor the opportunity to develop a connection with you(a good reason for a visitor to stay on your website!), and it is your best chance to convert more visits to enquiries/ more enquiries to customers.',
  },
  experiences: [
    {
      title: 'OJT NodeJS - FPT Software',
      date: '05/2021 - 11/2021',
      description1: '- On 05/2021 - 11/2021, I OJT NodeJS at FPT Software.',
      description2: '- My main tasks is Restful API design and development.',
      description3: '- Using typescript with NestJS.',
      description4: '- Using MySQL on the back end.',
    },
    {
      title: 'Interns NodeJS & ReactJS - Twendee Software',
      date: '02/2022 - 04/2022',
      description1:
        '- On 02/2022 - 04/2022, I Interns NodeJS & ReactJS at Twendee Software.',
      description2:
        '- My main tasks is using NestJS, ReactJS to build admin page for management sponsor event of website.',
      description3: '- Using typescript with NestJS and ReactJS.',
      description4: '- Using Postgresql on the back end.',
    },
  ],
  educations: [
    {
      title: 'FPT University - Hà Nội',
      date: '09/2018 - 09/2022',
      description: '- My major at university is software engineering!',
    },
  ],

  services: [
    {
      title: 'Web Developer',
      description: 'I want to become Fullstack Web Developer!',
      icon: <WebIcon />,
    },
  ],

  skills: [
    {
      title: 'FRONT-END',
      description: [
        'ReactJS',
        'HTML, CSS',
        'Javascript',
        'Bootstrap',
        'Antd, Tailwind',
      ],
    },
    {
      title: 'BACK-END',
      description: ['NodeJS', 'NestJS', 'Typescript', 'Docker'],
    },
    {
      title: 'DATABASES',
      description: ['MySQL', 'MSSQL Server'],
    },
    {
      title: 'SOURCE CONTROL',
      description: ['GitHub', 'GitLab'],
    },
  ],

  projects: [
    // Outstanding Project - NOT DONE
    {
      tag: 'NodeJS and ReactJS',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641002950/My%20Projects/NodeJS%20and%20ReactJS/dat_ve_xem_phim_reactjs_pumskg.jpg',
      title: 'NestJS & ReactJS - Website Đặt Vé Xem Phim',
      caption: 'NestJS & ReactJS',
      description:
        'Project NestJS & ReactJS - Website Đặt Vé Xem Phim. Thanks for watching!',
      videoId: 'goPfSfSaYb0',
      links: [
        { link: '', icon: <YouTubeIcon /> },
        { link: '', icon: <GitHubIcon /> },
        { link: '', icon: <LanguageIcon /> },
      ],
    },
    {
      tag: 'NodeJS and ReactJS',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641002950/My%20Projects/NodeJS%20and%20ReactJS/jira_bugs_clone_reactjs_snhzbl.jpg',
      title: 'NestJS & ReactJS - Jira Bugs Clone',
      caption: 'NestJS & ReactJS',
      description:
        'Project NestJS & ReactJS - Jira Bugs Clone. Thanks for watching!',
      videoId: 'goPfSfSaYb0',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=goPfSfSaYb0',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/jira_bugs_clone_reactjs_nestjs/tree/master',
          icon: <GitHubIcon />,
        },
        { link: '', icon: <LanguageIcon /> },
      ],
    },
    {
      tag: 'NodeJS',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641001541/My%20Projects/NodeJS%20and%20ReactJS/shopphone_nodejs_bl0k05.png',
      title: 'NodeJS - Phone Store',
      caption: 'NodeJS',
      description: 'Project NodeJS - Phone Store. Thanks for watching!',
      videoId: 'qzyHBChKD88',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=qzyHBChKD88',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/apple_store',
          icon: <GitHubIcon />,
        },
        {
          link: 'https://shop-phone-nodejs.herokuapp.com/home',
          icon: <LanguageIcon />,
        },
      ],
    },

    // ReactJS Project - DONE
    {
      tag: 'ReactJS',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641000892/My%20Projects/NodeJS%20and%20ReactJS/game_bau_cua_reactjs_g58tuc.jpg',
      title: 'ReactJS - Game Bầu Cua',
      caption: 'ReactJS',
      description: 'Project ReactJS - Game Bầu Cua. Thanks for watching!',
      videoId: 'hY2aWeOBotE',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=hY2aWeOBotE',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/game_bau_cua_reactjs/tree/master',
          icon: <GitHubIcon />,
        },
        { link: 'https://gamebaucua.surge.sh/', icon: <LanguageIcon /> },
      ],
    },

    // Other Projects - DONE
    {
      tag: 'Other Projects',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1640996752/My%20Projects/Other%20Projects/flatshop_home_page_admin_yy0hde.png',
      title: 'Java Spring - FlatShop',
      caption: 'Java Spring MVC',
      description: 'Project Spring MVC - FlatShop. Thanks for watching!',
      videoId: '0si0qdsfBQI',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=0si0qdsfBQI',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/FlatShop',
          icon: <GitHubIcon />,
        },
      ],
    },
    {
      tag: 'Other Projects',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1640996753/My%20Projects/Other%20Projects/luxstay_spkgie.png',
      title: 'ASP.NET - Luxury Clone',
      caption: 'ASP.NET',
      description: 'Project ASP.NET - Luxury Clone. Thanks for watching!',
      videoId: 'aLl1Pbtl0YA',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=aLl1Pbtl0YA',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/ASP.NET-MVC',
          icon: <GitHubIcon />,
        },
      ],
    },
    {
      tag: 'Other Projects',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641000346/My%20Projects/Other%20Projects/food_app_ykg3k5.jpg',
      title: 'Android - Food App',
      caption: 'Android & NestJS',
      description: 'Project Android - Food App. Thanks for watching!',
      videoId: '8AMy7oMwRkM',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=5Kba1mf6IBE',
          icon: <YouTubeIcon />,
        },
        {
          link: 'https://github.com/quanghavan29/Android-FU-Food',
          icon: <GitHubIcon />,
        },
      ],
    },
  ],

  favorites: [
    {
      title: '#FPTU Talent Show 6',
      imageUrl:
        'https://res.cloudinary.com/fpt-food/image/upload/v1641140896/My%20Projects/About%20Me/FTS6_o4smav.jpg',
      videoId: 'G9tNeJ9c0FI',
      description: 'Gặp Mẹ Trong Mơ - Sáo Trúc A4. #FTS6 #FTIC',
      caption: 'VIDEO',
      links: [
        {
          link: 'https://www.youtube.com/watch?v=G9tNeJ9c0FI',
          icon: <YouTubeIcon />,
        },
      ],
    },
  ],
};

export default resumeData;
