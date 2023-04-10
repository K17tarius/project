import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { db } from "../../firebase";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function AnalyticsReport() {

  var [totalRevenue, setTotalRevenue] = useState(0);
  var [totalOrders, setTotalOrders] = useState(0);
  var [totalCustomer, setTotalCustomer] = useState(0);
  var [averageOrderValue, setAverageOrderValue] = useState(0);
  const [chartData1, setChartData1] = useState(null); 
  const [chartData2, setChartData2] = useState(null); 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: '',
      },
    },
  };


  useEffect(()=>{
    const q = collection(db, "orders");
    getDocs(q).then((querySnapshot)=>{
      var totalRevenue = 0;
      var totalOrders = 0;
      var customers = [];
      var totalItemPrice = 0;
      var itemCount = 0;
      var monthlySalesData = [0,0,0,0,0,0,0,0,0,0,0,0]
      var bestSellerCount = {}

      querySnapshot.forEach((doc) => {
        for(var i=0;i<doc.data().items.length;i++){
          totalRevenue+= parseInt(doc.data().items[i].price) * doc.data().items[i].count
          totalItemPrice+= parseInt(doc.data().items[i].price);
          itemCount +=1;

          if(bestSellerCount[doc.data().items[i].name]){
            bestSellerCount[doc.data().items[i].name] += 1
          }
          else{
            bestSellerCount[doc.data().items[i].name] = 1
          }
        }
        monthlySalesData[doc.data().itemAddedOn.toDate().getMonth()] += 1
        totalOrders+=1;
        if(customers.includes(doc.data().addedBy) == false){
          customers.push(doc.data().addedBy)
        }
      
      });

      setTotalRevenue(totalRevenue)
      setTotalOrders(totalOrders)
      setTotalCustomer(customers.length)
      var average = (totalItemPrice/itemCount);
      setAverageOrderValue(average)


      // Line Chart

      const labels_line = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      setChartData1({
        labels: labels_line,
        datasets: [
          {
            label: 'Sales',
            data: monthlySalesData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      })


      // Bar Chart

      var bestSellerlabel = []
      var bestSellerValues = []

      for(var item in bestSellerCount){
        bestSellerlabel.push(item);
        bestSellerValues.push(bestSellerCount[item])
      }

      setChartData2({
        labels: bestSellerlabel,
        datasets: [
          {
            label: 'Sales',
            data: bestSellerValues,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      })
    })
   

  }, []);





  return (
    <div className="py-5 bg-light">
      <Container>
        <h2 className="mb-4">Analytics Report</h2>
        <Row className="mb-4">
          <Col md={3}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <Card.Text>Rs {totalRevenue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <Card.Text>{totalOrders}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Total Customers</Card.Title>
                <Card.Text>{totalCustomer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Average Order Value</Card.Title>
                <Card.Text>Rs {averageOrderValue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <h4>Sales by Category</h4>
            {/* <ProgressBar
              now={data.salesByCategory.doors}
              label={`Doors (${data.salesByCategory.doors}%)`}
              className="mb-2"
            />
            <ProgressBar
              now={data.salesByCategory.windows}
              label={`Windows (${data.salesByCategory.windows}%)`}
              className="mb-2"
            />
            <ProgressBar
              now={data.salesByCategory.railing}
              label={`Railing (${data.salesByCategory.railing}%)`}
              className="mb-2"
            /> */}
          </Col>
          <Col md={6}>
            <h4>Monthly Sales</h4>
            {chartData1 && <Line options={options} data={chartData1} />}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Best Sellers</h4>
            {chartData2 && <Bar options={options} data={chartData2} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AnalyticsReport;
