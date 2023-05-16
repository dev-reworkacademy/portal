import React, { useEffect, useState } from 'react';
import { DollarSign, UserCheck } from 'react-feather';

function CardComponent() {
  const [accountDetails, setAccountDetails] = useState([
    {
      id: 1,
      title: 'New Interests',
      details: ' 567',
      icon: DollarSign,
      colorStatus: '#2E2E2E',
      status: false,
    },
    {
      id: 2,
      title: 'Students',
      details: ' 45',
      icon: DollarSign,
      colorStatus: '#00AFEF',
      status: false,
    },
    {
      id: 3,
      title: 'Batches',
      details: ' 19',
      icon: DollarSign,
      colorStatus: '#FF5A5A',
      status: false,
    },
    {
      id: 4,
      title: 'Courses',
      details: '  24',
      icon: UserCheck,
      colorStatus: '#FFB906',
      status: false,
    },
    {
      id: 5,
      title: 'Revenue',
      details: '  ₦ 258,000',
      icon: UserCheck,
      colorStatus: '#2DB563',
      status: false,
    },
  ]);

  const handleClick = (e) => {
    let details = [...accountDetails];
    let account_details = details.find((x) => x.id === e.id);
    if (account_details) {
      account_details.status = true;
    } else if(!account_details){
      account_details.status = false;
    }
    setAccountDetails(details);
    console.log(account_details);
  };
  return (
    <div className="row ae_admin_small_card mt-5">
      {' '}
      {accountDetails?.map((e) => {
        let progressdisplay;
        let paddings;
        if (e.details.includes('%')) {
          progressdisplay = 'block';
        } else progressdisplay = 'none';

        if (e.details.includes('%')) {
          paddings = '0px';
        } else paddings = '10px';
        return (
          <div
            class="col-md-4 col-sm-4 mb-4 col-lg-2"
            key={e.id}
            onClick={() => handleClick(e)}
          >
            <div
              class="ae_smallcard py-3"
              style={{
                backgroundColor:
                  e.status === true ? e.colorStatus : 'transparent',
                color: e.status === true ? 'white' : 'black',
              }}
            >
              <div class="d-flex text-center no-gutters align-items-center justify-content-center">
                <div
                  class="ae_card_icon d-flex align-items-center justify-content-center me-1"
                  style={{ border: `1.5px solid ${e.colorStatus}` }}
                >
                  <e.icon color={e.status !== true ? e.colorStatus : 'black'} />
                </div>

                <div className="ml-1 ae_card_title">{e.title}</div>
              </div>
              <div class="col-auto">
                <div
                  class="ae_card_details mb-0 font-weight-bold  text-center"
                  style={{ color: e.status === true ? 'white' : 'black' }}
                >
                  {e.details}
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default CardComponent;
