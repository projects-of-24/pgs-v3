/**
 * React port of `src/legacy/pages/public-footer.html`.
 * Same DOM/classes so LegacyPage retained interactions keep working.
 *
 * OWN-F CSS (`pgs-owned-footer.css`) = UNLINKED workshop (OWN-UNLINK). Do not import here.
 */

declare global {
  interface Window {
    /** Legacy Hostinger modal hooks (public/assets/js). Optional until owned popups (Track C). */
    joinPremiumOpen?: () => void;
    REFRppOpenModal?: () => void;
  }
}

export type PublicFooterProps = {
  /** Optional account label for Join/login bits if needed later. Mostly static today. */
  accountLabel?: string;
  loginHref?: string;
};

export function PublicFooter(_props: PublicFooterProps = {}) {
  void _props;
  return (
    <div className="footer-bg">
      <section className="footer">
        <div className="flot-img">
          <img src="/assets/img/top.png" data-no-retina="" alt="" />
        </div>
        <div className="container pt-5 pb-8">
          <div className="row justify-content-center">
            <div className="col-lg-2">
              <div className="card-bg-pruple text-center w-210px">
                <h4 className="mb-0 fs-20 lh-full mt-7">
                  Currently studying? Become a mentor <br /> and help students.
                </h4>
                <button
                  type="button"
                  className="btn btn-join"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.joinPremiumOpen) {
                      return window.joinPremiumOpen();
                    }
                  }}
                >
                  Join The
                  <br className="pgs-join-br" />
                  Team!
                </button>
              </div>
            </div>
            <div className="col-lg-5 offset-1">
              <div className="yellow-bg">General Enquiries</div>

              <div className="d-flex gap-2 fs-20 text-white mt-2 mb-2">
                <img
                  src="/assets/img/mail.png"
                  width={25}
                  data-no-retina=""
                  alt=""
                />{" "}
                hello@purpleguide.study
              </div>
              <div className="yellow-bg mt-3">General Enquiries</div>
              <div className="d-flex gap-2 fs-20 text-white mt-2 mb-3">
                <img
                  src="/assets/img/mail.png"
                  width={25}
                  data-no-retina=""
                  alt=""
                />{" "}
                connect@purpleguide.study
              </div>
              <div className="social-flex mt-5 mb-3 d-flex align-items-center gap-3">
                <img src="/assets/img/right.png" data-no-retina="" alt="" />
                <h6 className="mb-0 text-white fs-20">Our Socials</h6>
                <div className="social-img d-flex align-items-center gap-3">
                  <a href="#">
                    <img src="/assets/img/instagram.png" data-no-retina="" alt="Instagram" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/facebook.png" data-no-retina="" alt="Facebook" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/threads.png" data-no-retina="" alt="Threads" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/youtube.png" data-no-retina="" alt="YouTube" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/linkdln.png" data-no-retina="" alt="LinkedIn" />
                  </a>
                </div>
                <img src="/assets/img/left.png" data-no-retina="" alt="" />
              </div>

              <div className="terms-content mt-6">
                <a href="#" className="d-block fs-20 fw-500 mt-1 text-white">
                  Privacy Policy
                </a>
                <a href="#" className="d-block fs-20 fw-500 mt-1 text-white">
                  Terms & Conditions
                </a>
                <a href="#" className="d-block fs-20 fw-500 mt-1 text-white">
                  Refund Policy
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="fs-14 lh-full mb-5 text-white">
                <span className="fs-15"> For</span>
                <br />
                Feedback, <br /> Escalations <br /> & Complaints
              </div>
              <div className="d-flex gap-2 fs-20 text-white mt-2 align-items-start">
                <img
                  src="/assets/img/mail.png"
                  width={25}
                  data-no-retina=""
                  alt=""
                />
                <div>
                  <span style={{ whiteSpace: "nowrap" }}>
                    hey@purpleguide.study
                  </span>
                  <p className="fs-14 fw-400 mb-0 mt-4 lh-full">
                    We’re a project-first team, and we try to sort out
                    complaints within 7 business days. Good vibes or tough love:
                    your feedback actually helps us level up.
                  </p>
                  <p className="fs-14 fw-400 mb-0 mt-4 lh-full">
                    All emails sent to this address will stay anonymous—unless
                    we spot any signs of misuse or suspicious activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="copyrght">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-center">
                <h4 className="w-20 text-white">#PGS</h4>
                <div className="d-flex align-items-center gap-4">
                  <h4
                    className="text-white fs-24 fw-700 lh-28 cursor-pointer"
                    onClick={() => {
                      if (
                        typeof window !== "undefined" &&
                        window.REFRppOpenModal
                      ) {
                        return window.REFRppOpenModal();
                      }
                    }}
                  >
                    (For Mentors) Help Students Choose <br />
                    Smarter – Earn with Our Referral Program
                  </h4>
                  <a
                    href="/unitieup"
                    className="text-white fw-700 fs-24 lh-28"
                  >
                    (For Universities) Give Your Students a <br />
                    Global Edge – Partner with #PGS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
