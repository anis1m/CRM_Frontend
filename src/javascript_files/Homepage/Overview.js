import React, { useEffect, useRef, useState } from "react";
import "../../css_files/Homepage/Overview.css";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function Overview({ showsidebar }) {
  Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement
  );
  const chartRef = useRef([]);
  const chartinstance = useRef([]);
  useEffect(() => {
    try {
      const ctx = chartRef.current[0].getContext("2d");

      if (chartinstance.current[0]) {
        chartinstance.current[0].destroy();
      }
      chartinstance.current[0] = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Total Parts Sold in Month in 2024",
              data: [12, 19, 3, 5, 2, 3, 8, 6, 3, 7, 5, 11],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },

              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[0]) {
          chartinstance.current[0].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const ctx = chartRef.current[1].getContext("2d");

      if (chartinstance.current[1]) {
        chartinstance.current[1].destroy();
      }
      chartinstance.current[1] = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Quotations Generated in month in 2024",
              data: [12, 19, 3, 5, 2, 3, 14, 11, 5, 9, 6, 2],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[1]) {
          chartinstance.current[1].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const ctx = chartRef.current[2].getContext("2d");

      if (chartinstance.current[2]) {
        chartinstance.current[2].destroy();
      }
      chartinstance.current[2] = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Orders Generated in month in 2024",
              data: [12, 19, 3, 5, 2, 3, 11, 12, 5, 9, 7, 6],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[2]) {
          chartinstance.current[2].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const ctx = chartRef.current[3].getContext("2d");

      if (chartinstance.current[3]) {
        chartinstance.current[3].destroy();
      }
      chartinstance.current[3] = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Technicians assigned in month in 2024",
              data: [12, 19, 3, 5, 2, 3, 17, 13, 14, 5, 9, 6],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[3]) {
          chartinstance.current[3].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const ctx = chartRef.current[4].getContext("2d");

      if (chartinstance.current[4]) {
        chartinstance.current[4].destroy();
      }
      chartinstance.current[4] = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Total Revenue Generated in Month in 2024",
              data: [12, 19, 3, 5, 2, 3, 11, 12, 5, 9, 7, 6],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[4]) {
          chartinstance.current[4].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const ctx = chartRef.current[5].getContext("2d");

      if (chartinstance.current[5]) {
        chartinstance.current[5].destroy();
      }
      chartinstance.current[5] = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Feedbacks Received in Month in 2024",
              data: [12, 19, 3, 5, 2, 3, 17, 13, 14, 5, 9, 6],
              borderColor: "#CC8400",
              backgroundColor: "orange",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Sales (in units)",
                color: "black",
              },
              ticks: {
                color: "black",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      });

      return () => {
        if (chartinstance.current[5]) {
          chartinstance.current[5].destroy();
        }
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <section className="category-master">
      <section className="overview">
        <h1>Dashboard (Under Construction)</h1>
        <div
          style={{
            gridTemplateColumns: showsidebar ? "1fr 1fr" : "1fr 1fr 1fr",
            width: showsidebar ? "90%" : "100%",
          }}
        >
          <figure>
            <canvas ref={(el) => (chartRef.current[0] = el)}></canvas>
          </figure>
          <figure>
            <canvas ref={(el) => (chartRef.current[1] = el)}></canvas>
          </figure>
          <figure>
            <canvas ref={(el) => (chartRef.current[2] = el)}></canvas>
          </figure>
          <figure>
            <canvas ref={(el) => (chartRef.current[3] = el)}></canvas>
          </figure>
          <figure>
            <canvas ref={(el) => (chartRef.current[4] = el)}></canvas>
          </figure>
          <figure>
            <canvas ref={(el) => (chartRef.current[5] = el)}></canvas>
          </figure>
        </div>
      </section>
    </section>
  );
}

export default Overview;
