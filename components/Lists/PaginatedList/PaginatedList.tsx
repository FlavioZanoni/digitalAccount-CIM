
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BaseEntity, GetApiParams, Pagination } from '@/lib/api/types';
import { filterBuilder } from '@/lib/filterBuilder';

type ApiFunction<T> = (params?: GetApiParams) => Promise<Pagination<T>>;

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element;
  title: string;
  label: string;
  apiFunction: ApiFunction<T>;
  currentId: number | undefined;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onClick?: ({ e, id }: { e: any; id: number }) => void;
  instance: string;
  query?: string;
  param?: {
    key: string;
    value: string;
  };
  children?: React.ReactNode;
  path?: string;
};

const ListItem = ({ label, isArrow }: { label: string; isArrow?: boolean }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{label}</Text>
    {isArrow && (
      <Text style={styles.arrow}>→</Text>
    )}
  </View>
);

function PaginatedList<T extends BaseEntity>({
  form,
  title,
  label,
  apiFunction,
  currentId,
  setCurrentId,
  onClick,
  instance,
  query,
  param,
  children,
  path,
}: PageListProps<T>) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`get${instance}`, param, query],
    queryFn: async ({ pageParam = { offset: 0, limit: 10 } }) => {
      const params = [];
      if (param) {
        params.push({
          key: param.key,
          value: param.value,
        });
      }
      if (query) {
        params.push({
          key: 'search',
          value: query,
        });
      }

      return apiFunction({
        offset: pageParam.offset,
        limit: pageParam.limit,
        filter: filterBuilder(params),
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) {
        return undefined;
      }
      return {
        offset: lastPage.number + 1,
        limit: lastPage.size,
      };
    },
    initialPageParam: { offset: 0, limit: 10 },
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <View style={styles.container}>
      {data?.pages?.[0]?.content?.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <View style={styles.contentContainer}>
          {data?.pages?.map((page, pageIndex) => {
            if (children) {
              return React.cloneElement(children as React.ReactElement, {
                data: page.content,
                key: pageIndex,
              });
            }
            return page?.content?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={(e) => {
                  if (path) return;

                  setCurrentId(item?.id);
                  if (onClick) {
                    onClick({ e, id: item?.id });
                    return;
                  }
                  setOpenDrawer?.(true);
                }}
              >
                <ListItem
                  label={item?.name}
                  isArrow={!!path}
                />
              </TouchableOpacity>
            ));
          })}
        </View>
      )}

      {(hasNextPage || isLoading) && !!data && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          disabled={isFetching || isLoading}
          onPress={() => fetchNextPage()}
        >
          {isFetching && !isLoading && data ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loadMoreText}>
              Carregar mais {title.toLowerCase()}
            </Text>
          )}
        </TouchableOpacity>
      )}

      <Modal
        visible={openDrawer}
        animationType="slide"
        onRequestClose={() => setOpenDrawer(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {currentId ? `Edit ${label}` : `New ${label}`}
            </Text>
            <TouchableOpacity onPress={() => setOpenDrawer(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {form && form({ id: currentId, setOpenDrawer })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const LoadingSkeleton = () => (
  <View style={styles.skeletonContainer}>
    {[1, 2, 3, 4].map((key) => (
      <View key={key} style={styles.skeletonItem} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 24,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  listItemText: {
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  loadMoreButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: '#000',
    fontSize: 14,
  },
  skeletonContainer: {
    gap: 24,
  },
  skeletonItem: {
    height: 57,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
});

export { PaginatedList };

