import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'

import Tabbar from './App/Tabbar'

import csvParser from 'csv-parse'

const zen2han = (str: string) => {
  return str.replace(/[！-～]/g, function(s: string) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }).replace(/　/g, ' ');
}

const App = () => {
  const [ shopList, setShopList ] = React.useState<Iemeshi.ShopData[]>([])

  React.useEffect(() => {
    fetch(`./data.csv`)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      csvParser(data, async (error, data) => {
        if (error) {
          console.log(error)
          setShopList([])
          return
        }

        const [header, ...records] = data;

        const features = records.map((record: string) => {
          const properties = header.reduce((prev: any, column: any) => {
            const value = record[header.indexOf(column)];
            prev[column] = zen2han(value);
            return prev;
          }, {});

          return properties;
        });

        const nextShopList: Iemeshi.ShopData[] = []
        for (let i = 0; i < features.length; i++) {
          const feature = features[i] as Iemeshi.ShopData
          if (!feature['緯度'] || !feature['経度'] || !feature['店名']) {
            continue;
          }
          if (!feature['緯度'].match(/^[0-9]+(\.[0-9]+)?$/)) {
            continue
          }
          if (!feature['経度'].match(/^[0-9]+(\.[0-9]+)?$/)) {
            continue
          }
          const shop = {
            index: i,
            ...feature
          }

          nextShopList.push(shop)
        }
        setShopList(nextShopList)
      });
    });
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <HashRouter>
          <Route exact path="/"><Home data={shopList} /></Route>
          <Route exact path="/list"><List data={shopList} /></Route>
          <Route exact path="/about" component={AboutUs} />
        </HashRouter>
      </div>
      <div className="app-footer">
        <Tabbar />
      </div>
    </div>
  );
}

export default App;
