import React, { Component } from "react";
import * as d3 from "d3";

// margin convention often used with D3

class Donut extends Component {
  drawChart() {
    let value = this.props.partial;
    let scale = this.props.scale - this.props.partial;
    let total = this.props.total;
    let title = this.props.title;

    // set the dimensions and margins of the graph
    const width = 270;
    const height = 270;
    const margin = 40;
    const divanchor = "." + this.props.class;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select(divanchor)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    const data = { "Vote Average": value, "": scale };

    // set the color scale
    const color = d3.scaleOrdinal().domain(data).range(["#8a89a6", "#fff"]);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function (d) {
        return d.value;
      });
    const data_ready = pie(d3.entries(data));

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:

    // Add the polylines between chart and labels:
   

    svg
      .append("text")
      .attr("y", "-12")
      .attr("text-anchor", "middle")
      .style("font-size", "35px")
      .style("font-weight", "bold")
      .text(value);

    svg
      .append("text")
      .attr("y", "32")

      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(String(title));
  }

  render() {
    this.drawChart();

    return <div className={this.props.class}></div>;
  }
}

export default Donut;
