import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Loader from '../../Components/Loader/Loader';
import { Character } from '../../Models/CharacterModel';
import { PageInfo } from '../../Models/PageInfo';
import './characterPage.scss';

const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [currentPage, setCurrentPage] = useState<number>(Number(id));
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${currentPage}`);
      setCharacter(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  const getPageInfo = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character/');
    setPageInfo(response.data.info);
  };

  useEffect(() => {
    getPageInfo();
    if (id) {
      getCharacter();
      navigate(`/characters/${currentPage}`);
    }
  }, [currentPage]);

  return (
    <div>
      {character && (
        <div>
          <img src={character.image} alt="not found" />
          <span>
            Name:
            {' '}
            {character.name}
          </span>
          <div className="character__prev-next-btn-container">
            {currentPage > 1 && (
            <Button
              text="<"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            />
            )}
            {pageInfo && currentPage < pageInfo?.count && (
            <Button
              text=">"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
            )}

          </div>
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default CharacterPage;
