import React, { useState } from 'react';
import {
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    date: '',
    amount: '',
    type: 'income',
    category: 'salary',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTransaction = () => {
    if (editIndex !== null) {
      const updatedTransactions = transactions.map((transaction, index) =>
        index === editIndex ? form : transaction
      );
      setTransactions(updatedTransactions);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, form]);
    }
    setForm({ date: '', amount: '', type: 'income', category: 'salary' });
  };

  const handleEditTransaction = (index) => {
    setForm(transactions[index]);
    setEditIndex(index);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Budgeting App</Text>
        <HStack spacing={4} width="100%">
          <Input
            placeholder="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <Input
            placeholder="Amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="salary">Salary</option>
            <option value="groceries">Groceries</option>
            <option value="bills">Bills</option>
          </Select>
          <Button onClick={handleAddTransaction}>
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => handleEditTransaction(index)}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrash />}
                      onClick={() => handleDeleteTransaction(index)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;