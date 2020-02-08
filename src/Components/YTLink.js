import React from "react";
import PropTypes from "prop-types";

export default class extends React.Component {
  state = {
    key: null
  };

  async YTLink({ key }) {
    try {
      let tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = await document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } catch {
    } finally {
      const onYouTubeIframeAPIReady = ({ key }) => {
        const player = new YT.Player("Trailer", {
          height: "240",
          width: "480",
          videoId: { key },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      };
    }
  }

  render() {
    const { key } = this.state;
    return <iframe id="Trailer" />;
  }
}
