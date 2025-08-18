"use client";

import ProfileCard from './ProfileCard';

const ProfileCardWrapper = () => {
  const handleContactClick = () => {
    window.open('https://www.instagram.com/yan_danu/', '_blank');
  };

  return (
    <ProfileCard
      name="W. Danu Tirta"
      title="Software Engineer"
      handle="yan_danu"
      status="Online"
      contactText="Contact Me"
      avatarUrl="/images/profile_me.png"
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      onContactClick={handleContactClick}
    />
  );
};

export default ProfileCardWrapper;
