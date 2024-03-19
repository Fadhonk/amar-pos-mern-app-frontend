// src/pages/Items.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items/get-item');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <Row gutter={[16, 16]}>
        {items.map(item => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={item.name} src={item.image} style={{ height: '200px', objectFit: 'cover' }} />}
            >
              <Meta title={item.name} description={`Price: $${item.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Items;
