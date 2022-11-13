package com.motoo.api.service;

import com.motoo.api.dto.accountDetail.*;

import java.util.List;

public interface AccountAssetService {
    /**계좌자산
     *
     */
    AccountAsset getAccountAsset(Long accountId, Long userId);
    List<ValueStock> getStockOrderByTotalValue(Long accountId, Long userId);
    List<ValueStock> getStockOrderByValuePLRatio(Long accountId, Long userId);
    List<ValueStock> getValueStockList(Long account, Long userId);

    int getStockAsset(Long accountId, Long userId);

    float getTotalValuePLRatio(Long accountId, Long userId);
}
