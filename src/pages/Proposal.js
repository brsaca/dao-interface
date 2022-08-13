import React, { useState, useEffect } from "react";
import "./pages.css";
import { Widget, Tag, Blockie, Tooltip, Icon, Form, Table } from "web3uikit";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useMoralis } from "react-moralis";

const Proposal = () => {

  const { state: proposalDetail } = useLocation();
  const { Moralis, isInitialized } = useMoralis();
  const [latestVote, setLatestVote] = useState();
  const [percUp, setPercUp] = useState(0);
  const [percDown, setPercDown] = useState(0);
  const [votes, setVotes] = useState([]);

  const onSubmit = () => {
    alert('Vote cast');
  }

  useEffect(() => {
    if(isInitialized){

      async function getVotes() {

        const Votes = Moralis.Object.extend("Votes");
        const query = new Moralis.Query(Votes);
        query.equalTo("proposal", proposalDetail.id);
        query.descending("createdAt");
        const results = await query.find();
        if(results.length > 0){
          setLatestVote(results[0].attributes);
          setPercDown(
            (
              (Number(results[0].attributes.votesDown) /
              (Number(results[0].attributes.votesDown) +
              Number(results[0].attributes.votesUp))) *
              100
            ).toFixed(0)
          );
          setPercUp(
            (
              (Number(results[0].attributes.votesUp) /
              (Number(results[0].attributes.votesDown) +
              Number(results[0].attributes.votesUp))) *
              100
            ).toFixed(0)
          );
        }

        const votesDirection = results.map((e) => [
          e.attributes.voter,
          <Icon 
            fill={e.attributes.votedFor ? "#2cc40a" : "#d93d3d"}
            size={24}
            svg={e.attributes.votedFor ? "checkmark" : "arrowCircleDown"}
          />
        ]);

        setVotes(votesDirection);

      }
      getVotes();

    }
  }, [isInitialized, proposalDetail, Moralis.Object, Moralis.Query])

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
          <div>{proposalDetail.description}</div>
          <div className="proposalOverview">
            <Tag color={proposalDetail.color} text={proposalDetail.text} />
            <div className="proposer">
              <span>Proposed By</span>
              <Tooltip content={proposalDetail.proposer}>
                <Blockie seed={proposalDetail.proposer}/>
              </Tooltip>
            </div>
          </div>
        </div>
        {latestVote && (
        <div className="widgets">
          <Widget 
            info={latestVote.votesUp}
            title="Votes For"
          >
            <div className="extraWidgetInfo">
              <div className="extraTitle">{percUp}%</div>
              <div className="progress">
                <div
                  className="progressPercentage"
                  style={{ width: `${percUp}%`}}
                ></div>
              </div>
            </div>
          </Widget>
          <Widget 
            info={latestVote.votesDown}
            title="Votes Against"
          >
             <div className="extraWidgetInfo">
              <div className="extraTitle">{percDown}%</div>
              <div className="progress">
                <div
                  className="progressPercentage"
                  style={{ width: `${percDown}%`}}
                ></div>
              </div>
            </div>
          </Widget>
        </div>
        )}
        <div className="votesDiv">
          <Table
            style={{ width: "60%" }}
            columnsConfig="90% 10%"
            data={votes}
            header={[<span>Address</span>, <span>Vote</span>]}
            pageSize={5}
          />
          <Form
            isDisabled={proposalDetail.text !== "Ongoing"}
            style={{
              width: "35%",
              height: "250px",
              border: "1px solid rgba(6, 158, 252, 0.2)",
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
