import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
return (
    <footer className="font-sans left-0 right-0 bg-white border-t border-gray-200 py-4 px-6">
        <div className="text-center mb-4">
            <h4 className="text-[#b05e5e] font-medium mb-3">Meal-ting Pot</h4>
            <p className="text-sm">
            Meal-ting Pot is an all-in-one platform that caters to both aspiring
            chefs and food enthusiasts. Whether you're eager to showcase your
            culinary flair to the world or seeking to broaden your palate, our
            website and social media app have got you covered. Join our community
            of passionate foodies and embark on a journey of discovering new
            flavors and culinary skills!
            </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <h5 className="font-medium mb-2">Featured Links</h5>
                <div>
                    <Link className="text-black no-underline hover:underline" to="/about">About Us</Link>
                </div>
            </div>
            <div className="text-right">
            <h5 className="mb-2">Contact Us</h5>
            <p className="mb-0">example@mealtingpot.com</p>
            <p>123-456-7890</p>
            </div>
        </div>
        <div className="text-center text-sm">
            © 2023 Meal-ting Pot™ • Hack Reactor - SJP Dec PT 2022
        </div>
    </footer>
);
};

export default Footer;
