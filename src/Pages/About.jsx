import { assets } from '../assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';
import Title from '../Components/Title';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px] "
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          ScrapLink was born out of a passion for sustainability and a vision to transform the way scrap materials are managed and traded. Our journey began with a simple idea: to create a platform where individuals and organizations can effortlessly connect with nearby scrap dealers, fostering a more efficient and eco-friendly approach to recycling. By bridging the gap between sellers and buyers, ScrapLink aims to make waste management smarter, easier, and more impactful for the environment and the community.
          </p>
          <p>
          Since our inception, we’ve worked tirelessly to create a platform that streamlines the process of trading scrap materials, catering to the diverse needs of individuals, businesses, and scrap dealers. From metals and plastics to paper and e-waste, ScrapLink provides a comprehensive and reliable marketplace where all materials are sourced and traded responsibly, ensuring sustainability and trust at every step.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            {' '}
            At ScrapLink, our mission is to empower individuals and organizations with sustainable choices, convenience, and confidence in managing waste materials. We are dedicated to providing a seamless platform that simplifies the process of recycling and trading scrap, ensuring an eco-friendly approach that benefits both the community and the environment. From listing and connecting to finalizing transactions, we strive to exceed expectations at every step while promoting a circular economy.
          </p>
        </div>
      </div>

      <div className="py-4 text-2xl">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row mb-20 text-sm gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
          We take pride in fostering connections for trading high-quality scrap materials that meet stringent standards for sustainability, usability, and environmental impact.{' '}
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
          Our user-friendly website and mobile app make it effortless to list, browse, and connect with scrap dealers on the go, ensuring a seamless experience for all users.{' '}
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Services</b>
          <p className="text-gray-600">
            Our dedicated team of customer service representatives is available
            around the clock to assist you with any queries or concerns you may
            have.{' '}
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
