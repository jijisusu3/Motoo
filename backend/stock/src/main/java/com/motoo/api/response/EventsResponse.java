package com.motoo.api.response;


import com.motoo.db.entity.Events;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EventsResponse")
public class EventsResponse {


    @ApiModelProperty(name = "이벤트_id")
    private Long eventsId;
    @ApiModelProperty(name = "이벤트 시작시간")
    private Date start_date;
    @ApiModelProperty(name = "이벤트 종료시간")
    private Date close_date;
    @ApiModelProperty(name = "명예의 전당")
    private String hall_of_fame;

    public static EventsResponse response(Events events){
        return new EventsResponse(events.getEventsId(), events.getOpen_date(), events.getClose_date(), events.getHall_of_fame());
    }
}
