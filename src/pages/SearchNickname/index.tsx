import React, { Fragment, useCallback, useState } from 'react';
import Toast from 'react-native-root-toast';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getFont } from 'utils/getFont';
import {
  NicknameItem,
  SuccessSearchNicknameParams,
  useSearchNickname,
} from 'hooks/api/useSearchNickname';
import { darkBlue, yellow } from 'assets/styles/colors';
import { mixinStyles } from 'assets/styles/mixin';
import { capsuleColors } from 'constants/capsuleColors';
import { sendNicknameState } from 'states/atoms';
import { RootStackParamList } from 'pages/routes';
import { TextInputTemplate } from 'components/InputRow/template';
import People from 'components/SvgComponents/people';
import RouteHeader from 'components/RouteHeader';
import ListFooterComponent from 'components/ListView/footer';
import TemplateText from 'components/TemplateText';

type SearchNicknameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SearchNickname'
>;

type SearchNicknameScreenRouteProp = RouteProp<
  RootStackParamList,
  'SearchNickname'
>;

function SearchNickname() {
  const navigation = useNavigation<SearchNicknameScreenNavigationProp>();
  const { params } = useRoute<SearchNicknameScreenRouteProp>();

  const [items, setItems] = useState<SuccessSearchNicknameParams>([]);
  const [searchText, setSearchText] = useState<string>('');
  const setSelectNickname = useSetRecoilState(sendNicknameState);

  const _getSource = (item: any) =>
    item.url || capsuleColors[item.imgNum].source;

  const _onPressSelectList = useCallback(
    (item: NicknameItem) => {
      navigation.navigate('SearchNickname', {
        type: 'select',
        personInfo: {
          source: _getSource({ ...item, imgNum: 0 }), // TODO: profile image
          id: item.id,
          name: item.userNickname,
        },
      });
    },
    [navigation],
  );

  const _onPressSelect = useCallback(() => {
    if (params.personInfo?.name) {
      setSelectNickname({
        userId: params.personInfo?.id,
        nickname: params.personInfo?.name || '',
      });
    } else {
      return Toast.show('해당 유저의 이름이 존재하지 않습니다.');
    }
    navigation.goBack();
  }, [
    navigation,
    params.personInfo?.id,
    params.personInfo?.name,
    setSelectNickname,
  ]);

  const _onSuccessSearchNickname = useCallback(
    (data: SuccessSearchNicknameParams) => setItems(data),
    [],
  );

  const { refetch: searchNickname, isLoading } = useSearchNickname(
    searchText,
    _onSuccessSearchNickname,
  );

  const _onSearch = useCallback(() => searchNickname(), [searchNickname]);

  const itemRenderer = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => _onPressSelectList(item)}>
        <Image
          style={styles.picture}
          source={_getSource({ ...item, imgNum: 0 })} // TODO: profile image
          width={68}
          height={68}
        />
        <View style={styles.nameWrap}>
          <TemplateText familyType="bold" style={styles.nameText}>
            {item.userNickname}
          </TemplateText>
        </View>
      </TouchableOpacity>
    ),
    [_onPressSelectList],
  );

  return (
    <Fragment>
      <RouteHeader
        label="캡슐 받을 친구 선택하기"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <View style={styles.mainContainer}>
        {params.type === 'search' ? (
          // 검색 화면
          <Fragment>
            <TextInputTemplate
              iconComponentFunc={People}
              inputWrapStyle={styles.inputWrap}
              inputProps={{
                style: styles.input,
                value: searchText,
                placeholder: '닉네임 검색하기',
                onChangeText: setSearchText,
                onSubmitEditing: _onSearch,
              }}
              containerStyle={styles.inputContainer}
            />
            <TemplateText familyType="bold" style={styles.listTitle}>
              {'최근 검색한 기록'}
            </TemplateText>
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              style={styles.flatListStyle}
              data={items}
              renderItem={itemRenderer}
              keyExtractor={(_, i) => String(i)}
              onEndReached={() => {}}
              onEndReachedThreshold={0.8}
              ListFooterComponent={<ListFooterComponent loading={isLoading} />}
            />
          </Fragment>
        ) : (
          // 선택된 화면
          <View style={styles.selectContainer}>
            <View>
              <Image
                style={styles.selectPicture}
                source={params.personInfo?.source}
                width={160}
                height={160}
              />
              <TemplateText familyType="bold" style={styles.selectNameText}>
                {params.personInfo?.name}
              </TemplateText>
            </View>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={_onPressSelect}>
              <TemplateText familyType="power" style={styles.buttonText}>
                {'선택'}
              </TemplateText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  flatListStyle: { width: '100%', paddingHorizontal: 10 },
  contentContainerStyle: { paddingBottom: 20 },

  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: yellow,
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: yellow,
  },
  itemContainer: {
    width: '100%',
    marginVertical: 17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  selectContainer: {
    ...mixinStyles.flexCenter,
    flex: 1,
    width: '100%',
    marginTop: '30%',
    justifyContent: 'space-between',
  },
  listTitle: { width: '100%', paddingHorizontal: 10 },
  picture: {
    marginRight: 25,
    borderRadius: 34,
  },
  selectPicture: {
    borderRadius: 80,
    marginBottom: 18,
  },
  nameWrap: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputWrap: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  input: {
    fontFamily: getFont('bold'),
    paddingLeft: 50,
  },
  selectNameText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  selectButton: {
    ...mixinStyles.flexCenter,
    width: '40%',
    height: 45,
    marginBottom: '20%',
    borderRadius: 4,
    backgroundColor: darkBlue,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SearchNickname;
