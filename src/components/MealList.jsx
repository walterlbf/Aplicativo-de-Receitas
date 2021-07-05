import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import ItemCard from './ItemCard';

export default function MealList() {
  const [showMeals, setShowMeals] = useState(false);
  const { mealsRecipes, resquestMealsApi } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowMeals(true);
    }
  }, [mealsRecipes]);

  useEffect(() => {
    resquestMealsApi();
  }, []);

  const renderCards = () => {
    if (mealsRecipes && mealsRecipes.length === 1) {
      console.log('3');
      return history.push(`/bebidas/${mealsRecipes[0].idDrink} `);
    }

    if (mealsRecipes && mealsRecipes.length > 1) {
      const NUMBER = 12;
      return mealsRecipes.map((item, index) => {
        if (index < NUMBER) {
          return (<ItemCard key={ index } item={ item } i={ index } />);
        }
        return null;
      });
    }

    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  };

  return (
    <Container>
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
