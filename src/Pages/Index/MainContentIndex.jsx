import React from "react";
import iconchat from "../../assets/icon-chat.png";
import iconmoney from "../../assets/icon-money.png";
import iconsecurity from "../../assets/icon-security.png";

import FeatureItem from "./featureItem";

const MainContentIndex = () => {
  const datasFeature = [
    {
      icon: iconchat,
      title: "You are our #1 priority",
      paragraph:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: iconmoney,
      title: "More savings means higher rates",
      paragraph:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: iconsecurity,
      title: "Security you can trust",
      paragraph:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {datasFeature.map((object) => {
        return (
          <FeatureItem
            key={object.icon}
            icon={object.icon}
            title={object.title}
            paragraph={object.paragraph}
          />
        );
      })}
    </section>
  );
};

export default MainContentIndex;
