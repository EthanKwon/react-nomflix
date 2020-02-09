import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      tabMenu: [true, false, false]
    };
  }

  clickTab = event => {
    event.target.value === 0
      ? this.setState({
          tabMenu: [true, false, false]
        })
      : event.target.value === 1
      ? this.setState({
          tabMenu: [false, true, false]
        })
      : this.setState({ tabMenu: [false, false, true] });
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({
        error: "Can't find anything."
      });
    } finally {
      this.setState({
        loading: false,
        result
      });
    }
  }

  render() {
    const { result, error, loading, tabMenu } = this.state;

    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        tabMenu={tabMenu}
        handleClick={this.clickTab}
      />
    );
  }
}
