import React from 'react';

import './timeline.css';

type IProps = {};

export const Timeline: React.FC<IProps> = () => {
  return (
    <div className="row d-flex justify-content-center mt-70 mb-70">
      <div className="col-md-6">
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">User Timeline</h5>
            <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-success"></i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title">Meeting with client</h4>
                    <p>
                      Meeting with USA Client, today at{' '}
                      <a href="javascript:void(0);" data-abc="true">
                        12:00 PM
                      </a>
                    </p>
                    <span className="vertical-timeline-element-date">9:30 AM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <p>
                      Another meeting with UK client today, at{' '}
                      <b className="text-danger">3:00 PM</b>
                    </p>
                    <p>
                      Yet another one, at{' '}
                      <span className="text-success">5:00 PM</span>
                    </p>
                    <span className="vertical-timeline-element-date">12:25 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-danger"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title">
                      Discussion with team about new product launch
                    </h4>
                    <p>
                      meeting with team mates about the launch of new product.
                      and tell them about new features
                    </p>
                    <span className="vertical-timeline-element-date">6:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-primary"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title text-success">
                      Discussion with marketing team
                    </h4>
                    <p>
                      Discussion with marketing team about the popularity of
                      last product
                    </p>
                    <span className="vertical-timeline-element-date">9:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-success"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title">Purchase new hosting plan</h4>
                    <p>
                      Purchase new hosting plan as discussed with development
                      team, today at{' '}
                      <a href="javascript:void(0);" data-abc="true">
                        10:00 AM
                      </a>
                    </p>
                    <span className="vertical-timeline-element-date">10:30 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <p>
                      Another conference call today, at{' '}
                      <b className="text-danger">11:00 AM</b>
                    </p>
                    <p>
                      Yet another one, at{' '}
                      <span className="text-success">1:00 PM</span>
                    </p>
                    <span className="vertical-timeline-element-date">12:25 PM</span>
                  </div>
                </div>
              </div>

              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <p>
                      Another meeting with UK client today, at{' '}
                      <b className="text-danger">3:00 PM</b>
                    </p>
                    <p>
                      Yet another one, at{' '}
                      <span className="text-success">5:00 PM</span>
                    </p>
                    <span className="vertical-timeline-element-date">12:25 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-danger"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title">
                      Discussion with team about new product launch
                    </h4>
                    <p>
                      meeting with team mates about the launch of new product.
                      and tell them about new features
                    </p>
                    <span className="vertical-timeline-element-date">6:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-primary"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title text-success">
                      Discussion with marketing team
                    </h4>
                    <p>
                      Discussion with marketing team about the popularity of
                      last product
                    </p>
                    <span className="vertical-timeline-element-date">9:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-success"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <h4 className="timeline-title">Purchase new hosting plan</h4>
                    <p>
                      Purchase new hosting plan as discussed with development
                      team, today at{' '}
                      <a href="javascript:void(0);" data-abc="true">
                        10:00 AM
                      </a>
                    </p>
                    <span className="vertical-timeline-element-date">10:30 PM</span>
                  </div>
                </div>
              </div>
              <div className="vertical-timeline-item vertical-timeline-element">
                <div>
                  <span className="vertical-timeline-element-icon bounce-in">
                    <i className="badge badge-dot badge-dot-xl badge-warning"> </i>
                  </span>
                  <div className="vertical-timeline-element-content bounce-in">
                    <p>
                      Another conference call today, at{' '}
                      <b className="text-danger">11:00 AM</b>
                    </p>
                    <p>
                      Yet another one, at{' '}
                      <span className="text-success">1:00 PM</span>
                    </p>
                    <span className="vertical-timeline-element-date">12:25 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};
