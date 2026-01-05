import React from "react";
import Image from "next/image";

const Testimonial = () => {
  return (
    <div>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              What our customers say
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Darrell Steward
                    </p>
                    <p className="text-sm text-gray-600 truncate">@darrels</p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    You made it so simple. My new site is so much faster and
                    easier to work with than my old site. I just choose the
                    page, make the change and click save.
                    <span className="block text-sky-500">#another</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Leslie Alexander
                    </p>
                    <p className="text-sm text-gray-600 truncate">@lesslie</p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    Simply the best. Better than all the rest. I&#39;d recommend
                    this product to beginners and advanced users.
                    <span className="block text-sky-500">#Celebration</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-3.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Jenny Wilson
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      @jennywilson
                    </p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    This is a top quality product. No need to think twice before
                    making it live on web.
                    <span className="block text-sky-500">#make_it_fast</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-4.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Kristin Watson
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      @kristinwatson2
                    </p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    YFinally, I&#39;ve found a template that covers all bases for a
                    bootstrapped startup. We were able to launch in days, not
                    months.
                    <span className="block text-sky-500">#Celebration</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-5.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Guy Hawkins
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      @jennywilson
                    </p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    This is a top quality product. No need to think twice before
                    making it live on web.
                    <span className="block text-sky-500">#make_it_fast</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-6.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Marvin McKinney
                    </p>
                    <p className="text-sm text-gray-600 truncate">@darrels</p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    With Celebration, it&#39;s quicker with the customer, the
                    customer is more ensured of getting exactly what they
                    ordered, and I&#39;m all for the efficiency.
                    <span className="block text-sky-500">#dev #tools</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-7.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Annette Black
                    </p>
                    <p className="text-sm text-gray-600 truncate">@darrels</p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    You made it so simple. My new site is so much faster and
                    easier to work with than my old site. I just choose the
                    page, make the change and click save.
                    <span className="block text-sky-500">#another</span>
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <Image
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-8.jpg"
                    alt=""
                    width={40}
                    height={40}
                    unoptimized={true}
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      Floyd Miles
                    </p>
                    <p className="text-sm text-gray-600 truncate">@darrels</p>
                  </div>

                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    My new site is so much faster and easier to work with than
                    my old site. I just choose the page, make the change and
                    click save.
                    <span className="block text-sky-500">#Celebration</span>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
