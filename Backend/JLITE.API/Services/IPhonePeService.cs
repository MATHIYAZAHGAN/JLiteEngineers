using System.Threading.Tasks;
using JLITE.API.Models;

namespace JLITE.API.Services
{
    public interface IPhonePeService
    {
        Task<PaymentInitResponse> InitiatePaymentAsync(CreatePaymentRequest request);
        Task<PaymentStatusResponse> CheckStatusAsync(string merchantTransactionId);
        Task ProcessCallbackAsync(string payload, string xVerifyHeader);
    }
}
