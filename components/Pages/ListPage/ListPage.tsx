import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { PaginatedList } from '../../Lists/PaginatedList';
import { BaseEntity, Pagination } from '@/lib/api/types';
import { useQuery } from "@tanstack/react-query";
import { getStoreList, Store } from "@/lib/api/store";
import { Select } from "@/components/Select";
import { useUserContext } from '@/hooks/useUserContext';
import { getUser } from '@/lib/api/user';

export interface OnClickProps {
  e: any;
  id: number;
}

type ApiFunction<T> = (params?: any) => Promise<Pagination<T>>;

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element;
  title: string;
  subtitle?: string;
  label: string;
  apiFunction: ApiFunction<T>;
  currentId: number | undefined;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onClick?: ({ e, id }: OnClickProps) => void;
  search?: boolean;
  instances: string[];
  apiParams?: {
    key: string;
    value: string;
  }[];
  children?: React.ReactNode;
  dividerLabel?: string[];
  path?: string;
  Accordion?: (data: any) => JSX.Element;
  hasStoreSelect?: boolean;
};

function ListPage<T extends BaseEntity>({
  form,
  title,
  subtitle,
  label,
  apiFunction,
  onClick,
  search,
  instances,
  apiParams,
  children,
  dividerLabel,
  path,
  currentId,
  setCurrentId,
  Accordion,
  hasStoreSelect,
}: PageListProps<T>) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Store | null>(null);
  const { userCtx } = useUserContext();

  const { data, isLoading } = useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const user = await getUser(userCtx?.id?.toString?.() || "1");
      // Set the first store as default selected
      setSelected(user.lojas[0]);
      return user.lojas;
    },
    enabled: hasStoreSelect,
  });

  const storeOptions = data?.map(store => ({
    label: store.nome,
    value: store.id,
  })) || [];


  if (hasStoreSelect && isLoading) {
    return
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SecondaryHeader title={title} subtitle={subtitle} />
        <Text style={{ marginBottom: 12 }} ></Text>

        {instances.map((instance, index) => (
          <View key={index} style={styles.instanceContainer}>
            {dividerLabel?.[index] && (
              <Text style={styles.dividerLabel}>
                {dividerLabel[index]}
              </Text>
            )}

            {hasStoreSelect && storeOptions.length > 1 && (
              <Select
                options={storeOptions}
                value={selected ? {
                  label: selected.nome,
                  value: selected.id,
                } : null}
                onChange={(option) => {
                  const selectedStore = data?.find(
                    store => store.id === option.value
                  );
                  setSelected(selectedStore || null);
                }}
                placeholder="Selecione uma loja"
              />
            )}

            <PaginatedList<T>
              storeId={selected?.id}
              form={form}
              title={title}
              label={label}
              apiFunction={apiFunction}
              param={apiParams?.[index]}
              currentId={currentId}
              setCurrentId={setCurrentId}
              onClick={onClick}
              instance={instance}
              query={query}
              path={path}
              Accordion={Accordion}
            >
              {children}
            </PaginatedList>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 174,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
    flexDirection: 'column',
    gap: 24,
    marginBottom: 24,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  instanceContainer: {
    flexDirection: 'column',
    gap: 24,
    backgroundColor: 'white',
  },
  dividerLabel: {
    position: 'absolute',
    top: -24,
    backgroundColor: 'white',
    color: '#1f1f1f',
  },
  pickerContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 200,
  },
  picker: {
    height: 50,
    color: "#4a5568",
  },
});

export { ListPage };
