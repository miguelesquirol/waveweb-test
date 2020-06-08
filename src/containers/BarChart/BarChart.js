import React, { Component } from "react";
import * as d3 from "d3";
import "./BarChart.scss"

// BarChart that can be reused

class BarChart extends Component {
  drawChart() {
    let i;
    let data = [];
    let maxValue = 0;
    const title = this.props.title;
    const val = this.props.val;
    const divanchor = "." + this.props.class;
    const tolltipTitle = this.props.tolltipTitle;

    if (this.props.filmlist) {

      for (i = 0; i < 9; i++) {
        if (this.props.filmlist[i][val] > maxValue) {
          maxValue = this.props.filmlist[i][val];
        }
        data.push({
          Title: this.props.filmlist[i].title,
          Value: this.props.filmlist[i][val],
        });
      }
    }
    const margin = { top: 10, right: 30, bottom: 90, left: 60 },
      width = 560 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    d3.selectAll(divanchor + " svg").remove();
  

    const svg = d3  
      .select(divanchor)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Title;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Title);
      })      
      .attr("width", x.bandwidth())
      .attr("fill", "#9395D3")
      // no bar at the beginning thus:
      .attr("height", function (d) {
        return height - y(0);
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0);
      })
      .on("mousemove", function (d) {
        console.log("tooltip");

        d3.select(this).attr("fill", "#B3B7EE");
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html( "<strong> " + d.Title + "</strong><br/> " + d.Value + " " + tolltipTitle  );
      })
      .on("mouseout", function (d, i) {
        tooltip.style("display", "none");
        d3.select(this).attr("fill", function (d) {          
            return "#9395D3";
         
        });
      });

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) {
        return y(d.Value);
      })
      .attr("height", function (d) {
        return height - y(d.Value);
      })
      

      .delay(function (d, i) {
        console.log(i);
        return i * 100;
      });
    svg
      .append("g")
      .call(d3.axisLeft(y));
      
    // text label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(title);

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  }

  render() {
    this.drawChart();

    return <div className={this.props.class}></div>;
  }
}

export default BarChart;
