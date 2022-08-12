import React, { useState, useEffect } from "react";
import "./pages.css";
import { Widget, Tag, Blockie, Tooltip, Icon, Form, Table } from "web3uikit";
import { Link } from "react-router-dom";

const Proposal = () => {

  const [votes, setVotes] = useState([
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#268c41" size={24} svg="checkmark" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#268c41" size={24} svg="checkmark" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
  ]);

  const onSubmit = () => {
    alert('Vote cast');
  }

  return (
    <>
      <div className="contentProposal">
        <div className="proposal">
          <Link to="/">
            <div className="backHome">
              <Icon fill="#ffffff" size={20} svg="chevronLeft"/>
              Overview
            </div>
          </Link>
          <div>Should we accept Elon Musks $$44billion offer for our DAO?</div>
          <div className="proposalOverview">
            <Tag color={"red"} text={"Rejected"} />
            <div className="proposer">
              <span>Proposed By</span>
              <Tooltip content={"0xfBdEb9e74c3774cB0767e582db33d5eAa7b2a2F3"}>
                <Blockie seed={"0xfBdEb9e74c3774cB0767e582db33d5eAa7b2a2F3"}/>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="widgets">
          <Widget 
            info={10}
            title="Votes For"
          >
            <div className="extraWidgetInfo">
              <div className="extraTitle">{25}%</div>
              <div className="progress">
                <div
                  className="progressPercentage"
                  style={{ width: `${25}%`}}
                ></div>
              </div>
            </div>
          </Widget>
          <Widget 
            info={30}
            title="Votes Against"
          >
             <div className="extraWidgetInfo">
              <div className="extraTitle">{75}%</div>
              <div className="progress">
                <div
                  className="progressPercentage"
                  style={{ width: `${75}%`}}
                ></div>
              </div>
            </div>
          </Widget>
        </div>
        <div className="votesDiv">
          <Table
            style={{ width: "60%" }}
            columnsConfig="90% 10%"
            data={votes}
            header={[<span>Address</span>, <span>Vote</span>]}
            pageSize={5}
          />
          <Form
            style={{
              width: "35%",
              height: "250px",
              border: "1px solid rgba(6, 158, 252, 0,2)",
            }}
            buttonConfig={{
              isLoading: false,
              loadingText: "Casting Vote",
              text: "Vote",
              theme: "secondary",
            }}
            data={[
              {
                inputWidth: "100%",
                name: "Cast Vote",
                options: ["For", "Against"],
                type: "radios",
                validation: {
                  required: true,
                },
              },
            ]}
            onSubmit={onSubmit}
          />
        </div>
     </div>
      <div className="voting"></div>
    </>
  );
};

export default Proposal;
