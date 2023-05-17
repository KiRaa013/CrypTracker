import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../Context";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  console.log(trending);

  useEffect(() => {
    const fetchTrendingCrypto = async () => {
      const { data } = await axios.get(TrendingCoins(currency));

      setTrending(data);
    };
    fetchTrendingCrypto();
  }, [currency]);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={"/coins/${coin.id"}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "green" : "red" }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        {/* <br /> */}
        <span style={{ fontSize: 25, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
