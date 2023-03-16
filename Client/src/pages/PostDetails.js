import { Grid } from "@material-ui/core";
import "../component/assets/css/PostDetails.css";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

const PostDetails = () => {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2}></Grid>
      <Grid item xs={10} sm={10}>
        <h1>Post Details</h1>
        <div className="post">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png"
                alt=""
              />
              <span className="postUsername"> phat </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="postTitle">
              Trùm 'lính đánh thuê' Nga nói vấp phải kháng cự ở Bakhmut{" "}
            </span>

            <span className="postDate">
              {" "}
              Thứ bảy, 11/2/2023, 11:46 (GMT+7){" "}
            </span>
          </div>
          <div className="postContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo
            ipsum eget nunc ultrices, vel tristique purus blandit. Sed at
            aliquam eros, vel posuere turpis. Duis commodo felis id est mollis
            varius. Nulla consequat mauris eget fringilla euismod. Morbi sit
            amet massa consequat, consectetur ex id, congue enim. Duis aliquet,
            magna ac ullamcorper fringilla, dolor quam bibendum nisl, ut
            bibendum mi turpis eu purus. Nullam efficitur velit ut tellus
            imperdiet, vel eleifend tellus vulputate. Quisque ornare enim
            euismod nibh sagittis, eu commodo ante sodales. Nam in turpis a nisi
            commodo vulputate non eget odio. Sed interdum arcu non turpis
            commodo, sit amet molestie justo tristique. Integer vel risus id
            lacus faucibus pretium. Sed sit amet justo nibh.
          </div>
          <center>
            <img
              className="postImg"
              src="https://i1-vnexpress.vnecdn.net/2023/02/11/338x2u3-highres-jpeg-167608857-4743-9923-1676088762.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=3aFq-KzFpKU7hJ75-caEdg"
              alt=""
            />
          </center>
          <div className="postBottom">
            <div className="postBottomLeft">
              <LikeOutlined style={{ fontSize: "32px" }} />
              <span className="postLikeCounter"> 10 </span>
              <DislikeOutlined style={{ fontSize: "32px" }} />
              <span className="postDislikeCounter"> 10 </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> 10 comments </span>
            </div>
          </div>
          <br />
          <div>comments</div>
          <br />
          <div>
            <img
              className="postImage"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png"
              alt=""
            />
            <span className="postUsername"> phat </span>
            <span className="postComment"> sfdlkasdjlfjladsjfl</span>
          </div>
          <br />
          <div>
            <img
              className="postImage"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png"
              alt=""
            />
            <span className="postUsername"> phat </span>
            <span className="postComment"> sfdlkasdjlfjladsjfl</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
export default PostDetails;
