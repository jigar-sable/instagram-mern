import React from 'react';
import homepage from '../../assests/images/homepage.webp';

const Auth = ({ children }) => {
    return (
        <div className="w-full h-full">

            <div className="flex w-full h-screen md:w-2/3 py-8 mx-auto">

                <div className="hidden md:block bg-[url('https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png')] my-10 h-full bg-no-repeat">
                    <img draggable="false" className="mr-[80px] mt-[1.8rem] ml-[155px]" src={homepage} alt="homepage" />
                </div>

                <div className="flex flex-col gap-3 w-full md:w-2/5">

                    {children}

                    <p className="text-center text-sm my-2">Get the app.</p>
                    <div className="flex gap-3 justify-center" >
                        <img draggable="false" width="130px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="appstore" />
                        <img draggable="false" width="130px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="playstore" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth