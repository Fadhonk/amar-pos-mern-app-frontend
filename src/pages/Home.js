import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Modal, Input, Typography } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const Home = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleInvoice, setVisibleInvoice] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [paymentCode, setPaymentCode] = useState('');

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

  const handleBuyClick = (itemId) => {
    setSelectedItemId(itemId);
    setVisible(true);
  };

  const handleConfirmPayment = () => {
    console.log(`Payment confirmed for item id: ${selectedItemId}`);
    setVisible(false);
    setVisibleInvoice(true);
  };

  const handleInputCodeChange = (value) => {
    setPaymentCode(value);
  };

  const handlePayNow = async () => {
    if (paymentCode === '303080') {
      alert('Payment Success');

      try {
        const response = await axios.post('http://localhost:8080/api/bills/add-bill', {
          itemId: selectedItemId,
          transactionId: Date.now(), // Gunakan timestamp sebagai id transaksi sementara
          itemName: items.find(item => item._id === selectedItemId)?.name || '',
          timestamp: new Date().toLocaleString(),
        });

        console.log('Data berhasil disimpan:', response.data);
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
      }
    }
  };

  return (
    <div>
      <h2>Featured Items</h2>
      <Row gutter={[16, 16]}>
        {items.map(item => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={item.name} src={item.image} style={{ height: '200px', objectFit: 'cover' }} />}
            >
              <Meta title={item.name} description={`Price: $${item.price}`} />
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                onClick={() => handleBuyClick(item._id)}
                style={{ marginTop: '10px' }}
              >
                Buy
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Confirm Payment"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleConfirmPayment}
      >
        Are you sure you want to proceed with the payment for this item?
      </Modal>

      <Modal
        title="Invoice"
        visible={visibleInvoice}
        onCancel={() => setVisibleInvoice(false)}
        footer={[
          <Button key="back" onClick={() => setVisibleInvoice(false)}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handlePayNow}>
            Bayar sekarang
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '0' }}>Silahkan bayar</h1>
          <p>Tanggal: {new Date().toLocaleDateString()}</p>
          <Input
            placeholder="Masukkan kode pembayaran"
            onChange={(e) => handleInputCodeChange(e.target.value)}
            value={paymentCode}
            style={{ marginTop: '20px', width: '200px' }}
          />
          <Text type="danger" style={{ marginTop: '10px' }}>
            {paymentCode === '303080'}
          </Text>
          <p style={{ marginTop: '20px' }}>Terima kasih atas pembayaran Anda.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
