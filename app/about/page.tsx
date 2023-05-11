export const metadata = {
  title: "Foodel | About",
  description: "About Foodel",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:flex-col sm:items-center">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          About Foodel
        </h2>
      </div>
      <div className="mx-auto mt-10 flex flex-col gap-2 text-gray-400">
        <p>
          Foodel was founded in 2023 by a team of passionate foodies who wanted
          to share their love of Italian cuisine with the world. We specialize
          in providing fresh, homemade dishes delivered straight to your
          doorstep.
        </p>
        <p>
          Our mission is to bring the authentic taste of Italy to your home,
          using only the freshest, high-quality ingredients. We spent months
          researching and testing recipes to perfect our menu, and now
          we&apos;re proud to offer a wide variety of mouth-watering dishes.
        </p>
        <p>
          At Foodel, we offer delivery straight to your door, so you can enjoy a
          delicious Italian meal without leaving your home. We also offer
          catering services for parties and events, and can even create custom
          orders to suit your preferences.
        </p>
        <p>
          Our team is made up of experienced chefs and food enthusiasts who are
          passionate about Italian cuisine. Each member brings a unique set of
          skills and expertise to the table, allowing us to create the best
          possible dishes for our customers.
        </p>
      </div>
    </div>
  );
}
