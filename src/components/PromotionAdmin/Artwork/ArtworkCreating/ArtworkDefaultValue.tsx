import { projectType } from '@/types/PromotionAdmin/artwork';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryDropDown from '../CategoryDropDown';
import ImageUpload from './ImageUpload';

export type DefaultValueItem = {
  name: string;
  title: string;
  description: string;
  content: React.ReactNode;
  error?: string;
};

export const getArtworkDefaultValue = (
  selectedDate: Date | null,
  handleDateChange: (date: Date | null) => void,
  selectedCategory: string,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  isprojectopened: boolean,
  handleTogglePosted: () => void,
  projectType: projectType,
  setProjectType: (type: projectType) => void,
  link: string,
  handleLinkChange: (newLink: string) => void,
  mainImage: File | undefined | null,
  handleMainImageChange: (newImage: File | File[]) => void,
  responsiveMain: File | undefined | null,
  handleResponsiveMainImageChange: (newImage: File | File[]) => void,
  detailImage: File[],
  handleDetailImageChange: (newImages: File | File[]) => void,
  title: string,
  handleTitleChange: (newTitle: string) => void,
  customer: string,
  handleCustomerChange: (newCustomer: string) => void,
  overview: string,
  handleOverviewChange: (newOverview: string) => void,
  isTopMainArtwork: boolean,
  handleImageClick?: (src: string) => void,
  getModeMainImg?: string,
  getModeResponsiveMainImg?: string,
  getModeDetailImgs?: string[],
  isGetMode?: boolean,
) => {
  const defaultValue: DefaultValueItem[] = [
    {
      name: 'title',
      title: '아트워크 제목',
      description: '아트워크 제목은 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{title}</GetInputWrapper>
      ) : (
        <StyleInputContainer>
          <StyledInput
            data-cy='create_artwork_title'
            required
            value={title}
            maxLength={30}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(e.target.value)}
          />
          <CharacterCount>{title.length} / 30</CharacterCount>
        </StyleInputContainer>
      ),
    },
    {
      name: 'overview',
      title: '아트워크 설명',
      description: '아트워크 설명은 최대 120자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{overview}</GetInputWrapper>
      ) : (
        <StyleInputContainer>
          <OverviewInput
            data-cy='create_artwork_overview'
            required
            value={overview}
            maxLength={120}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleOverviewChange(e.target.value)}
          />
          <CharacterCount>{overview.length} / 120</CharacterCount>
        </StyleInputContainer>
      ),
    },
    {
      name: 'customer',
      title: '아트워크 고객사',
      description: '아트워크 고객사는 최대 30자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetInputWrapper>{customer}</GetInputWrapper>
      ) : (
        <StyleInputContainer>
          <StyledInput
            data-cy='create_artwork_customer'
            required
            value={customer}
            maxLength={30}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleCustomerChange(e.target.value)}
          />
          <CharacterCount>{customer.length} / 30</CharacterCount>
        </StyleInputContainer>
      ),
    },
    {
      name: 'date',
      title: '아트워크 제작 일시',
      description: '해당 아트워크의 제작 일시를 선택해주세요.',
      content: isGetMode ? (
        <GetInputWrapper>{selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}</GetInputWrapper>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format='YYYY-MM-DD'
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(newValue) => handleDateChange(newValue ? newValue.toDate() : null)}
            slotProps={{
              textField: {
                inputProps: { 'data-cy': 'create_artwork_date' },
                sx: {
                  width: '100%',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  backgroundColor: '#dadada9f',
                  '.MuiOutlinedInput-root': {
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#ffffff73',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      ),
    },
    {
      name: 'category',
      title: '아트워크 카테고리',
      description: '',
      content: isGetMode ? (
        <GetInputWrapper>{selectedCategory}</GetInputWrapper>
      ) : (
        <CategoryDropDown
          data-cy='create_artwork_category'
          putCategory={selectedCategory.toString()}
          setSelectedCategory={setSelectedCategory}
        />
      ),
    },
    {
      name: 'link',
      title: '아트워크 외부 연결 미디어 링크',
      description: '아트워크 외부 연결 링크는 최대 200자까지 입력 가능합니다.',
      content: isGetMode ? (
        <GetHrefContainer>
          <GetHrefWrapper href={link} target='_blank'>
            {link}
          </GetHrefWrapper>
        </GetHrefContainer>
      ) : (
        <StyleInputContainer>
          <StyledInput
            data-cy='create_artwork_link'
            required
            value={link}
            maxLength={300}
            placeholder='링크를 입력하세요'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleLinkChange(e.target.value)}
          />
          <CharacterCount>{link.length} / 200</CharacterCount>
        </StyleInputContainer>
      ),
    },
    {
      name: 'artworkType',
      title: '아트워크 타입',
      description: `① 대표\n 메인 페이지에서 가장 먼저 보이는 아트워크이며, 1개만 지정할 수 있습니다. \n\n ③ 메인\n 메인 페이지에서 슬라이드로 보이는 아트워크이며, 최대 5개까지 지정할 수 있습니다. \n\n ② 기본\n 그 외의 아트워크 유형으로, 아트워크 페이지에서 보여집니다.`,
      content: (
        <TypeContainer data-cy='create_artwork_artworkType' projectType={projectType}>
          <div onClick={() => !isGetMode && projectType !== 'top' && setProjectType('top')}>대표</div>
          <div onClick={() => !isGetMode && projectType !== 'main' && setProjectType('main')}>메인</div>
          <div onClick={() => !isGetMode && projectType !== 'others' && setProjectType('others')}>기본</div>
        </TypeContainer>
      ),
    },
    {
      name: 'isOpened',
      title: '아트워크 프로모션 페이지 공개 여부',
      description: '비공개로 설정할 시, 프로모션의 아트워크 페이지에서 숨겨집니다.',
      content: isTopMainArtwork ? (
        <>
          <IsTopMainArtworkText>⚠ 대표, 메인 선택 시 항상 프로모션 페이지에 공개됩니다.</IsTopMainArtworkText>
          <IsTopMainArtworkContainer data-cy='create_artwork_isOpened'>
            <div
              data-cy='create_artwork_isOpened_open'
              onClick={() => !isGetMode && !isprojectopened && handleTogglePosted()}
            >
              공개
            </div>
            <div
              data-cy='create_artwork_isOpened_hide'
              onClick={() => !isGetMode && isprojectopened && handleTogglePosted()}
            >
              비공개
            </div>
          </IsTopMainArtworkContainer>
        </>
      ) : (
        <Ispostedcontainer data-cy='create_artwork_isOpened' isopened={isprojectopened ? 'true' : 'false'}>
          <div
            data-cy='create_artwork_isOpened_open'
            onClick={() => !isGetMode && !isprojectopened && handleTogglePosted()}
          >
            공개
          </div>
          <div
            data-cy='create_artwork_isOpened_hide'
            onClick={() => !isGetMode && isprojectopened && handleTogglePosted()}
          >
            비공개
          </div>
        </Ispostedcontainer>
      ),
    },

    {
      name: 'mainImage',
      title: '아트워크 썸네일 이미지 설정',
      description: '썸네일 이미지는 최대 한 개만 설정 가능합니다.',
      content:
        isGetMode && getModeMainImg ? (
          <HoverContainer onClick={() => handleImageClick && handleImageClick(getModeMainImg)}>
            <IsGetModeImg src={getModeMainImg} alt='메인 이미지' />
            <HoverText>클릭하여 상세보기</HoverText>
          </HoverContainer>
        ) : (
          <>
            <ImageUpload
              type='main'
              value={mainImage}
              onChange={(newImage: File | File[]) => handleMainImageChange(newImage)}
            />
          </>
        ),
    },

    {
      name: 'responsiveMainImage',
      title: '아트워크 반응형 썸네일 이미지 설정',
      description: '반응형 썸네일 이미지는 최대 한 개만 설정 가능합니다.\n권장픽셀: 400px*900px',
      content:
        isGetMode && getModeResponsiveMainImg ? (
          <HoverContainer onClick={() => handleImageClick && handleImageClick(getModeResponsiveMainImg)}>
            <IsGetModeImg src={getModeResponsiveMainImg} alt='메인 반응형 이미지' />
            <HoverText>클릭하여 상세보기</HoverText>
          </HoverContainer>
        ) : (
          <>
            <ImageUpload
              type='responsiveMain'
              value={responsiveMain}
              onChange={(newImage: File | File[]) => handleResponsiveMainImageChange(newImage)}
            />
          </>
        ),
    },
    {
      name: 'detailImages',
      title: '아트워크 서브 이미지',
      description:
        '아트워크 서브 이미지는 해당 아트워크 페이지 안에서 보이며, 최소 1개에서 최대 3개까지 지정 가능합니다.',
      content:
        isGetMode && getModeDetailImgs ? (
          getModeDetailImgs.map((i, index) => (
            <HoverContainer key={`detail-image-${index}`} onClick={() => handleImageClick && handleImageClick(i)}>
              <IsGetModeImg src={i} alt={`서브 이미지 ${index + 1}`} />
              <HoverText>클릭하여 상세보기</HoverText>
            </HoverContainer>
          ))
        ) : (
          <ImageUpload
            onChange={(newImage: File | File[]) => handleDetailImageChange(newImage)}
            type='detail'
            value={detailImage}
          />
        ),
    },
  ];
  return defaultValue;
};

export default getArtworkDefaultValue;

const IsGetModeImg = styled.img`
  width: 100%; /* 부모 너비에 맞게 설정 */
  height: 100%; /* 부모 높이에 맞게 설정 */
  object-fit: cover; /* 이미지 비율을 유지하며 꽉 채우기 */
  border-radius: 5px;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7; /* 마우스 호버 시 옅어짐 */
  }
`;

const IsTopMainArtworkText = styled.h1`
  font-family: 'pretendard-semibold';
  margin-bottom: 8px;
  font-size: 13px;
  color: #4e4e4ec5;
`;

const IsTopMainArtworkContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #cacaca88;
  height: 2rem;
  border-radius: 10px;
  position: relative;
  width: 8rem;
  font-size: 0.9rem;

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;
  }
`;

const StyledInput = styled.textarea`
  width: 100%;
  padding: 8px;
  height: 8rem;
  box-sizing: border-box;
  font-family: 'pretendard-medium';
  outline-style: none;
  border-radius: 5px;
  font-size: 15px;
  border: none;
  color: black;
  margin-bottom: 20px;
  background-color: #dadada9f;
  resize: none; /* 크기 조정 비활성화 */
  &:hover {
    cursor: pointer;
    background-color: #ffffff73;
    transition: all 300ms ease-in-out;
  }
  &:focus {
    background-color: white;
    transition: all 300ms ease-in-out;
  }
  ::placeholder {
    color: #7a7a7a;
  }
`;

const GetInputWrapper = styled.div`
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 0.9rem;
  line-height: 140%;
  font-family: 'pretendard-regular';
`;

const GetHrefContainer = styled.div`
  width: 100%;

  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
const GetHrefWrapper = styled.a`
  text-decoration: none;
  border: none;
  font-size: 0.9rem;
  line-height: 140%;
  font-family: 'pretendard-regular';
  word-wrap: break-word; /* 긴 단어를 줄바꿈 */
  overflow-wrap: break-word; /* 긴 단어를 줄바꿈 */
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
`;
const OverviewInput = styled.textarea`
  width: 100%;
  height: 'fit-content';
  padding: 8px;
  height: 8rem;
  font-family: 'pretendard-medium';
  outline-style: none;
  box-sizing: border-box;
  resize: none; /* 크기 조정 비활성화 */
  border-radius: 5px;
  font-size: 15px;
  border: none;
  background-color: #d1d1d1a0;
  color: black;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    background-color: #ffffff73;
    transition: all 300ms ease-in-out;
  }
  &:focus {
    background-color: white;
    transition: all 300ms ease-in-out;
  }
  ::placeholder {
    color: #7a7a7a;
  }
`;

const HoverContainer = styled.div`
  position: relative;
  width: 100%;
  height: 9rem;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  background-color: #0000002b;
  margin-bottom: 0.5rem;

  &:hover img {
    opacity: 0.7; /* 이미지 호버 시 흐릿하게 */
  }

  &:hover div {
    opacity: 1; /* 텍스트 호버 시 보이기 */
  }
`;

const HoverText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'pretendard-semibold';
  font-size: 14px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const Ispostedcontainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isopened',
})<{ isopened: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  background-color: #a3a3a360;
  height: 2rem;
  border-radius: 10px;
  position: relative;
  width: 8rem;
  font-size: 0.9rem;

  &::before {
    content: '';
    position: absolute;
    width: 4rem;
    height: 100%;
    background-color: #fcfcfce2;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isopened === 'true' ? 'translateX(0)' : 'translateX(4rem)')};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:first-child {
      color: ${(props) => (props.isopened === 'true' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'bold' : 'normal')};
    }

    &:last-child {
      color: ${(props) => (props.isopened === 'true' ? 'grey' : 'black')};
      font-weight: ${(props) => (props.isopened === 'true' ? 'normal' : 'bold')};
    }
  }
`;
const TypeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'projectType',
})<{ projectType: projectType }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'pretendard-semibold';
  font-size: 0.9rem;
  background-color: #a3a3a360;
  height: 2rem;
  border-radius: 10px;
  position: relative;
  width: 12rem;

  &::before {
    content: '';
    position: absolute;
    width: 4rem;
    height: 100%;
    background-color: #fcfcfce2;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => {
      switch (props.projectType) {
        case 'top':
          return 'translateX(0)';
        case 'main':
          return 'translateX(4rem)';
        case 'others':
          return 'translateX(8rem)';
        default:
          return 'translateX(0)';
      }
    }};
  }

  div {
    z-index: 1;
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: normal;
    color: grey;

    &:nth-child(1) {
      color: ${(props) => (props.projectType === 'top' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'top' ? 'bold' : 'normal')};
    }

    &:nth-child(2) {
      color: ${(props) => (props.projectType === 'main' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'main' ? 'bold' : 'normal')};
    }

    &:nth-child(3) {
      color: ${(props) => (props.projectType === 'others' ? 'black' : 'grey')};
      font-weight: ${(props) => (props.projectType === 'others' ? 'bold' : 'normal')};
    }
  }
`;
const CharacterCount = styled.div`
  font-size: 0.6rem;
  font-family: 'pretendard-regular';
  position: absolute;
  bottom: 2rem;
  right: 0.8rem;
  color: #424242;
  text-align: right;
  background-color: #dadada;
  border-radius: 5px;
  padding: 0.4rem;
`;

const StyleInputContainer = styled.div`
  position: relative;
`;
