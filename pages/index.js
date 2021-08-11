import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import HomeSearchForm from '../components/bookingSearchForm';

class Home extends React.Component {
  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Welcome"
      >
        <div className="home">
          <div className="splash-image">
            <div className="container">
              <div className="popover-wrapper">
              <div className="popover">
                {
                  !this.props.isAuthenticated ? (
                    <>
                    <h1>Handle payments, the easy way</h1>
                    <Link href="/login">
                      <button className="btn btn-primary btn-book">
                        Sign in to continue
                      </button>
                    </Link></>
                  ) : <>
                  <h1>Pay suppliers in your network</h1>
                    {/* <HomeSearchForm size="large" /> */}

                    <div className="button-container">
                      <Link href="/listings">
                        <a className="btn btn-primary">Show invoices</a>
                      </Link>
                    </div>
                  </>
                }
                
              </div>
              {this.props.isAuthenticated && (
                <div className="popover">
                   <>
                  <h1>Get paid easy</h1>

                    <div className="button-container">
                      <Link href="/dashboard">
                        <a className="btn btn-primary">Go to dashboard</a>
                      </Link>
                    </div>
                  </>
                </div>
              )
              }
            </div>
            </div>
          </div>

          <div className="annotation">
            <p>
              <img src="static/stripe.svg" width="60" />
              This is a Proof Of Concept, to find out how to leverage {' '}
              <a className="stripe" href="https://stripe.com">
                Stripe
              </a>{' '}
              <a href="https://stripe.com/connect" target="_blank">
                Connect
              </a>{' '}
              to build an ecosystem for Tour Management.{' '}
            </p>
          </div>
        </div>
        <style jsx>{`
          .home {
            width: 100%;
            position: absolute;
            top: 160px;
            left: 0;
            right: 0;
            bottom: 0;
          }

          h1 {
            font-size: 27px;
            font-weight: 600;
            color: #202020;
            width: 85%;
            margin-bottom: 30px;
          }

          .splash-image {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            vertical-align: bottom;

            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0) 50%,
                #ffffff 100%
              ),
              url(https://images.unsplash.com/photo-1570489679487-936e2897d793?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bXVzaWMsYXJ0aXN0LGZlc3RpdmFsfHx8fHx8MTYyODQ5MTgxMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600)
                no-repeat;
            background-size: cover;
            background-position: center center;
          }

          .popover-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }

          .popover {
            padding: 20px;
            margin: 20px;
            position: relative;
            width: 100%;
            background-color:rgba(255, 255, 255, 0.85);
            border: 0;
            box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1),
              0 5px 15px 0 rgba(0, 0, 0, 0.07);
            border-radius: 6px;
          }

          @media (min-width: 768px) {
            .popover-wrapper {
              flex-direction: row;
            }
          }

          @media (min-width: 768px) {
            .popover {
              margin: 0;
              padding: 40px;
              width: 350px;
              max-width: 350px;
            }
          }
          .booking-form {
            width: 100%;
            margin: 20px 0;
          }

          .button-container {
            display: flex;
            justify-content: flex-end;
          }

          .annotation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            min-height: 50px;

            background: #fff;
            text-align: center;
            font-size: 12px;
          }

          .annotation img,
          .annotation a,
          .annotation p {
            display: inline-block;
            margin: 0;
          }

          .annotation img {
            margin-right: 10px;
          }

          .annotation a:link,
          .annotation a:visited {
            color: #32325d;
          }

          @media (min-width: 768px) {
            .annotation {
              max-width: 800px;
              margin-left: auto;
              margin-right: auto;
              bottom: 30px;
              border-radius: 50px;
              padding: 10px;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
