import { message } from "antd";

const FeedbackForm = () => {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value;
    const feedback = form.message?.value;

    const sendFeedbackData = {
      email: email,
      feedback: feedback,
    };

    fetch(`http://localhost:3000/api/v1/my-feedback`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendFeedbackData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        message.success("Feedback Sent");
      });
  };
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                At the same time, the fact that we are wholly owned and totally
                independent from manufacturer and other group control gives you
                confidence that we will only recommend what is right for you.
              </p>

              <div className="mt-8">
                <a
                  href=""
                  className="text-2xl font-bold text-blue-500 no-underline"
                >
                  +8801755299400
                </a>

                <address className="mt-2 not-italic">
                  Dinajpur, Bangladesh
                </address>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full h-40 rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    id="message"
                    name="message"
                    required
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className=" cursor-pointer inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackForm;
