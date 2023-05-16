import axios from 'axios'
import {useQuery, useQueryClient, useMutation} from 'react-query'

const baseUrl = "https://reworkacademy.co/app/v2/";

const fetchClassData = ({queryKey})=>{
    const classId  = queryKey[1];
    return axios.get(`${baseUrl}live-class/${classId}`)
}

const enrollForClass = ({studentId,classId})=>{
    console.log("data+++>", classId, studentId);
    return axios.post(`${baseUrl}live-class/enroll`,{
        "live_class_id": classId,
        "student_id": studentId
    })
}

const cancelEnrollment = ({studentId,classId})=>{
    return axios.post(`${baseUrl}live-class/unenroll`,{
        "live_class_id": classId,
        "student_id": studentId
    })
}

const fetchEnrollmentStatus =async({queryKey})=>{
    const studentId = queryKey[1];
    const classId = queryKey[2];
    try {
   const resp =  await axios.get(`${baseUrl}students/${studentId}/enrolled-live-class`)
    return resp?.data?.data?.length > 0 ?resp?.data?.data?.some(classData=>classData?.id === classId):false
    } catch (error) {
        
    }

}

// fetch all live classes for a particular student
export const useFetchAStudentClassesData = (studentId)=>{
    return useQuery(
        ["live-classes", studentId],
        ()=>{
            return axios.get(`${baseUrl}students/${studentId}/self-pace/live-class`)
        },
        {
          enabled:!!studentId,
          staleTime:120000  
        }
    )
}

// fetch details for a particular class
export const useClassDetailsData =(classId)=>{
    const queryClient = useQueryClient();
    return useQuery(['class-details', classId], fetchClassData,{
        // initialData: ()=>{
        //     const classFound = queryClient.getQueryData(['live-classes'])?.data?.find((classData)=>classData?.id === classId)
        //     if(classFound){
        //         return{
        //             data:classFound
        //         }
        //     }else{
        //         return undefined
        //     }
        // },
        onError:(error)=>{
           return console.log("we couldn't fetch class details=>", error);
        },
        enabled:!!classId,
        staleTime:180000,
    } )
}

// check if student has enrolled for a class or not
export const useStudentEnrollmentData = ({studentId,classId}) =>{
    return useQuery(['enrollment-status',studentId,classId],fetchEnrollmentStatus,{
        enabled:!!studentId,
        staleTime:60000
    })
}

// enroll student for a class
export const useEnrollForClassData = ({studentId, classId})=>{
    const queryClient = useQueryClient();
    return useMutation(enrollForClass,{
        onMutate:async ()=>{
            await queryClient.cancelQueries(['enrollment-status',studentId,classId]);
            const prevEnrollCheckData = queryClient.getQueryData(['enrollment-status',studentId,classId]);
            queryClient.setQueryData(['enrollment-status',studentId,classId],(oldCheckData)=>{
                return {
                    ...oldCheckData,
                    data: true
                }
            })
            return {prevEnrollCheckData}
        },
        onError:(_error, _enrollCheck, context)=>{
            //if it errors out rollback the data to previous state 
            queryClient.setQueryData(['enrollment-status',studentId,classId], context.prevEnrollCheckData);
        },
        onSettled:()=>{
            queryClient.invalidateQueries(['enrollment-status',studentId,classId])
        }
    })
}

// cancel enroll
export const useCancelEnrollData = ({studentId, classId})=>{
    const queryClient = useQueryClient();
    return useMutation(cancelEnrollment,{
        onMutate:async ()=>{
            await queryClient.cancelQueries(['enrollment-status',studentId,classId]);
            const prevEnrollCheckData = queryClient.getQueryData(['enrollment-status',studentId,classId]);
            queryClient.setQueryData(['enrollment-status',studentId,classId],(oldCheckData)=>{
                return {
                    ...oldCheckData,
                    data: false
                }
            })
            return {prevEnrollCheckData}
        },
        onError:(_error, _enrollCheck, context)=>{
            //if it errors out rollback the data to previous state 
            queryClient.setQueryData(['enrollment-status',studentId,classId], context.prevEnrollCheckData);
        },
        onSettled:()=>{
            queryClient.invalidateQueries(['enrollment-status',studentId,classId])
        }
    })
}