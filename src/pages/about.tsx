export default function AboutPage() {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl mb-2 font-bold text-red-700">Who is Mike?</h1>
      <h2 className="text-center mb-8">I build solutions for hard problems on the web.</h2>
      <div className="flex w-full">
        <div className="w-full prose sm:prose-lg md:w-3/5 md:pr-10">
          <p>
            Hi! I&apos;m Mike. Since 2013, I&apos;ve been responsible for building, testing, and
            ensuring the reliability of web applications in a variety of contexts and industries.
            I&apos;ve built membership acquisition funnels for e-commerce, visualizations and
            dashboards for data-driven applications, and currently I&apos;m leading development of a
            voice-first mobile application to improve efficiency in warehouses.
          </p>
          <p>
            With all that in mind, I feel confident that I can begin giving back to the community
            that has helped me for so many years. I have gotten to where I am right now in my career
            thanks in no small part due to the selfless contributions of talented engineers within
            the open source community. If you happen to be one of them, know that you have my
            heartfelt thanks.
          </p>
          <p>
            I&apos;ll be sharing my thoughts, knowledge, and in time projects that may help you
            become a better developer.
          </p>
          <div>
            <a className="link underline" href="https://github.com/mike-lawson">
              Github
            </a>
          </div>
          <div>
            <a
              className="link underline"
              href="https://www.linkedin.com/in/michael-lawson-181312103/"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="hidden md:flex md:w-2/5">
          <img
            className="rounded md:h-1/2 lg:h-3/5 md:object-cover md:object-center"
            src="/images/headshot.jpg"
            alt="Mike Lawson looking out, the crowns of trees shielding the sky behind him"
          />
        </div>
      </div>
    </div>
  );
}
